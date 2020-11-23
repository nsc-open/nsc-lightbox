import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { findIndex } from 'lodash'
import ImageStaticMap from './ImageStaticMap'
import LightboxToolbar from './LightboxToolbar'
import LightboxNav from './LightboxNav'
import IFrame from './IFrame'
import { Toast, Icon } from 'antd-mobile';

const isLink = (img) => {
  const fileType = img.fileType ? img.fileType : ''
  return fileType && fileType.indexOf('pdf') !== -1 || img.fileExt.indexOf('doc') !== -1 || img.fileExt.indexOf('xls') !== -1
}

const isImg = (img) => {
  const fileType = img.fileType ? img.fileType : ''
  return fileType && fileType.indexOf('image') !== -1
}

class LightboxViewer extends Component {
  state = {
    mapZoom: 1,
    visibleMap: false,
    activeIndex: 0,
    imgH: 0,
    imgW: 0,
    visibleLink: false,
    showInfo: true,
  }

  componentWillMount() {
    const { imgvActiveImage, activeIndex } = this.props
    if (imgvActiveImage) {
      const obj = { visibleMap: isImg(imgvActiveImage), visibleLink: isLink(imgvActiveImage), activeIndex: activeIndex }
      this.setState(obj)
    }
  }

  onZoomInClick = () => {
    if (this.map) {
      const currentZoom = this.map.map.getView().getZoom()
      this.setState({ mapZoom: currentZoom + 0.5 })
    }
  }

  onZoomOutClick = () => {
    if (this.map) {
      const currentZoom = this.map.map.getView().getZoom()
      this.setState({ mapZoom: currentZoom - 0.5 })
    }
  }

  onPrevClick = () => {
    const { imgvImages, imgvActiveImage, onChange } = this.props
    let index = findIndex(imgvImages, i => i.uri === imgvActiveImage.uri)
    index = index - 1
    const prevImage = imgvImages[index]
    if (prevImage) {
      this.setState({ activeIndex: index, showInfo: true, visibleMap: isImg(prevImage), visibleLink: isLink(prevImage) })
      onChange && onChange(prevImage)
    } else {
      Toast.info('到头了', .5)
    }
  }

  onNextClick = () => {
    const { imgvImages, imgvActiveImage, onChange } = this.props
    let index = findIndex(imgvImages, i => i.uri === imgvActiveImage.uri)
    index = index + 1
    const nextImage = imgvImages[index]
    if (nextImage) {
      this.setState({ activeIndex: index, showInfo: true, visibleMap: isImg(nextImage), visibleLink: isLink(nextImage) })
      onChange && onChange(nextImage)
    } else {
      Toast.info('到尾了', .5)
    }
  }

  onShowInfoClick = () => {
    const { showInfo } = this.state
    this.setState({ showInfo: !showInfo })
  }

  handleChangeImg = (newIndex) => {
    const { imgvImages, onChange } = this.props
    const newImage = imgvImages[newIndex]
    this.setState({ activeIndex: newIndex, showInfo: true, visibleLink: isLink(newImage), visibleMap: isImg(newImage) })
    onChange && onChange(newImage)
  }

  getImageSize = ({ width, height }) => {
    console.log('width', width, height)
    this.setState({ imgW: width, imgH: height })
  }

  render() {
    const { imgvImages, imgvActiveImage, onDeleteInfoClick, onAddInfoClick, onCloseClick, displayTools, customTools, toolposition } = this.props
    const { mapZoom, activeIndex, imgH, imgW, visibleLink, visibleMap, showInfo } = this.state
    const uri = imgvActiveImage ? imgvActiveImage.uri : ''
    const base64DataURL = imgvActiveImage ? imgvActiveImage.base64DataURL : ''

    const tools = customTools ? customTools : [
      { name: 'zoomIn', iconfont: 'icon-zoomIn', title: '放大' },
      { name: 'zoomOut', iconfont: 'icon-zoomOut', title: '缩小' },
      { name: 'addInfo', iconfont: 'icon-formOutline', title: '添加批注' },
      { name: 'deleteInfo', iconfont: 'icon-deleteInfo', title: '删除批注', hidden: base64DataURL ? false : true },
      { name: 'showInfo', iconfont: `${showInfo ? 'icon-showInfo' : 'icon-hideInfo'}`, title: `${showInfo ? '隐藏' : '查看'}批注`, disable: base64DataURL ? false : true },
      { name: 'prev', iconfont: 'icon-prev', title: '上一页' },
      { name: 'next', iconfont: `icon-next`, title: `下一页` },
      { name: 'close', iconfont: 'icon-close', title: '关闭' },
    ].filter(tool => {
      if (displayTools[0] === '*') {
        return true
      } else {
        return displayTools.includes(tool.name)
      }
    })

    return (
      <div>
        <div className="lightbox-viewer-content" style={{ zIndex: 1015 }} >
          {visibleMap && <ImageStaticMap
            ref={ref => this.map = ref}
            mapZoom={mapZoom}
            src={uri}
            dataURL={base64DataURL}
            getImageSize={this.getImageSize}
            showInfo={showInfo}
          />}
          {visibleLink &&
            <IFrame
              src={uri}
            />
          }
          {
            !visibleMap && !visibleLink &&
            <div style={{ color: '#fff', minHeight: '500px', fontSize: '16px', lineHeight: '40px', margin: '0 auto', textAlign: 'center', paddingTop: '30px' }}>
              <Icon type="cross-circle" style={{ fontSize: '35px' }} />
              <div>该文件不支持预览</div>
            </div>
          }
        </div>
        {
          toolposition === 'bottom' ?
            <div className="lightbox-viewer-footer" style={{ zIndex: 9999 }} >
              <LightboxToolbar
                tools={tools}
                onZoomInClick={this.onZoomInClick}
                onZoomOutClick={this.onZoomOutClick}
                onPrevClick={this.onPrevClick}
                onNextClick={this.onNextClick}
                onShowInfoClick={this.onShowInfoClick}
                onDeleteInfoClick={onDeleteInfoClick}
                onAddInfoClick={onAddInfoClick}
                onCloseClick={onCloseClick}
                toolposition={toolposition}
              />
            </div>
            : <>
              <div className={`lightbox-viewer-footer-${toolposition}`} style={{ zIndex: 9999 }} >
                <LightboxToolbar
                  tools={tools}
                  onZoomInClick={this.onZoomInClick}
                  onZoomOutClick={this.onZoomOutClick}
                  onPrevClick={this.onPrevClick}
                  onNextClick={this.onNextClick}
                  onShowInfoClick={this.onShowInfoClick}
                  onDeleteInfoClick={onDeleteInfoClick}
                  onAddInfoClick={onAddInfoClick}
                  onCloseClick={onCloseClick}
                  toolposition={toolposition}
                />
              </div>
              <div className="lightbox-viewer-footer" style={{ zIndex: 9999 }} >
                <p className="lightbox-viewer-attribute">
                  <span className="lightbox-viewer-img-details">{`(${imgW} x ${imgH})`}</span>
                  <span className="lightbox-viewer-showTotal">{`${activeIndex + 1} of ${imgvImages.length}`}</span>
                </p>
                <LightboxNav
                  images={imgvImages}
                  activeIndex={activeIndex}
                  onChangeImg={this.handleChangeImg}
                />
              </div>
            </>
        }
      </div>
    )
  }
}

LightboxViewer.propTypes = {
  visible: PropTypes.bool,
  imgvImages: PropTypes.array,
  onCancel: PropTypes.func,
}

LightboxViewer.defaultProps = {
  visible: false,
  imgvImages: [],
}

export default LightboxViewer;
