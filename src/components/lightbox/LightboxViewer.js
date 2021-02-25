import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { findIndex } from 'lodash'
import ReactDom from 'react-dom'
import ImageStaticMap from './ImageStaticMap'
import LightboxToolbar from './LightboxToolbar'
import LightboxNav from './LightboxNav'
import IFrame from './IFrame'
import { message, Icon } from 'antd'


const isImageFileType = (type) => !!type && type.indexOf('image') === 0;

export const isImg = (file) => {
  if (isImageFileType(file.fileType)) {
    return true
  }
  const extension = file.fileExt ? file.fileExt : ''
  if (
    /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)
  ) {
    return true;
  }
  if (extension) {
    // other file types which have extension
    return false
  }
  return true
}

const isLink = (file) => {
  const extension = file.fileExt ? file.fileExt : ''
  if (
    /(pdf|doc|docx|xls|xlsx|ppt)$/i.test(extension)
  ) {
    return true;
  }
  if (extension) {
    // other file types which have extension
    return false;
  }
  return true
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
      message.info('到头了', .5)
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
      message.info('到尾了', .5)
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
    const { imgvImages, imgvActiveImage, onDeleteInfoClick, onAddInfoClick, onCloseClick, displayTools, customTools, showAttribute, showNav, showToolbar } = this.props
    const { mapZoom, activeIndex, imgH, imgW, visibleLink, visibleMap, showInfo } = this.state
    const uri = imgvActiveImage ? imgvActiveImage.uri : ''
    const base64DataURL = imgvActiveImage ? imgvActiveImage.base64DataURL : ''

    const tools = customTools ? customTools : [
      { name: 'zoomIn', iconfont: 'icon-zoomIn', title: '放大', disable: visibleLink ? true : false },
      { name: 'zoomOut', iconfont: 'icon-zoomOut', title: '缩小', disable: visibleLink ? true : false },
      { name: 'addInfo', iconfont: 'icon-formOutline', title: '添加批注' },
      { name: 'deleteInfo', iconfont: 'icon-deleteInfo', title: '删除批注', hidden: base64DataURL ? false : true },
      { name: 'showInfo', iconfont: `${showInfo ? 'icon-showInfo' : 'icon-hideInfo'}`, title: `${showInfo ? '隐藏' : '查看'}批注`, disable: base64DataURL ? false : true },
      { name: 'prev', iconfont: 'icon-prev', title: '上一项' },
      { name: 'next', iconfont: `icon-next`, title: `下一项` },
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
              <Icon type="exclamation-circle" style={{ fontSize: '35px' }} />
              <div>该文件不支持预览</div>
            </div>
          }
        </div>
        {visibleMap && showToolbar && <p className="lightbox-viewer-attribute">
          <span className="lightbox-viewer-img-details">{`(${imgW} x ${imgH})`}</span>
          <span className="lightbox-viewer-showTotal">{`${activeIndex + 1} of ${imgvImages.length}`}</span>
        </p>}
        {showToolbar && <div className="lightbox-viewer-toolbar" >
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
          />
        </div>}
        {!visibleLink && showNav && <LightboxNav
          images={imgvImages}
          activeIndex={activeIndex}
          onChangeImg={this.handleChangeImg}
        />}
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
