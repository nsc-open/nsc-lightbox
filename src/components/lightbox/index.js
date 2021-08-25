
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import LightboxViewer from './LightboxViewer';
import Drawbox from './Drawbox';
import { downloadFile } from './utils'
import ImgMerge from './ImgMerge'
import Url from 'url-parse'

import '../../assets/fonts/icon-font/iconfont.css'
import './index.css'
import "react-img-editor/assets/index.css"

const isImageFileType = (type) => !!type && type.indexOf('image') === 0;

const isImg = (file) => {
  if (isImageFileType(file.fileType)) {
    return true
  }
  const extension = file.fileExt ? file.fileExt : ''
  if (
    /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)
  ) {
    return true
  }
  if (extension) {
    // other file types which have extension
    return false
  }
  return true
}
class Lightbox extends Component {

  state = {
    imgvActiveImage: null,
    drawboxVisible: false,
  }

  componentWillMount() {
    const { imgvImages } = this.props
    if (imgvImages.length > 0) {
      const imgvActiveImage = 'activeIndex' in this.props ? imgvImages[this.props.activeIndex] : imgvImages[0]
      this.setState({ imgvActiveImage })
    }
  }

  componentDidUpdate(prevProps) {
    const { imgvImages } = this.props
    if (imgvImages !== prevProps.imgvImages) {
      const imgvActiveImage = 'activeIndex' in this.props ? imgvImages[this.props.activeIndex] : imgvImages[0]
      this.setState({ imgvActiveImage })
    }
  }

  onChange = (imgvActiveImage) => {
    this.setState({ imgvActiveImage })
  }

  onAddInfoClick = () => {
    this.setState({ drawboxVisible: true })
  }

  onDeleteInfoClick = () => {
    this.onDeleteClick()
  }

  hideDrawViewerHandler = () => {
    this.setState({ drawboxVisible: false })
  }

  onSaveClick = () => {
    const { onSaveInfo } = this.props
    const { imgvActiveImage } = this.state
    onSaveInfo && onSaveInfo(imgvActiveImage)
  }

  onSaveAddInfoClick = (dataURL) => {
    const { imgvActiveImage } = this.state
    this.setState({ imgvActiveImage: { ...imgvActiveImage, base64DataURL: dataURL } })
    this.onCancelDrawClick()
  }

  onDeleteClick = () => {
    const { imgvActiveImage } = this.state
    this.setState({ imgvActiveImage: { ...imgvActiveImage, base64DataURL: '' } })
    if (this.props.onDeleteInfoClick) {
      this.props.onDeleteInfoClick(imgvActiveImage)
    }
  }

  onCloseClick = () => {
    const { drawboxVisible } = this.state
    if (drawboxVisible) {
      this.setState({ drawboxVisible: false })
    } else {
      const { onCancel } = this.props
      onCancel && onCancel()
    }
  }

  onDownloadClick = () => {
    const { imgvActiveImage } = this.state
    const { fileName, uri, originUri, base64DataURL, width, height } = imgvActiveImage
    if (isImg(imgvActiveImage) && base64DataURL) {
      // console.log('base64DataURL',base64DataURL)
      const parsed = new Url(originUri, null, true)
      parsed.query.time = new Date().valueOf()
      const url = parsed.toString()
      const imgs = [
        {
          url: url,
          width: width,
          height: height
        },
        {
          url: base64DataURL,
          width: width,
          height: height
        }
      ]
      let imgMerge = new ImgMerge({ imgs })
      imgMerge.outputImg()
    } else {
      downloadFile(originUri, fileName)
    }
  }

  onCancelDrawClick = () => {
    this.setState({ drawboxVisible: false })
  }

  setImageSize = (width, height) => {
    this.setState({ imgvActiveImage: { ...this.state.imgvActiveImage, width, height } })
  }

  render() {
    const { imgvImages, visible, withDrawer, customTools, activeIndex, showAttribute, showNav, showToolbar } = this.props
    const { imgvActiveImage, drawboxVisible } = this.state
    const { uri, base64DataURL } = imgvActiveImage
    const parsed = new Url(uri, null, true)
    parsed.query.time = new Date().valueOf()
    const url = parsed.toString()
    const showStyle = {
      'opacity': 1,
      'display': 'block'
    }

    const hiddenStyle = {
      'display': 'none'
    }

    const displayTools = withDrawer || customTools ? ['*'] : 'displayTools' in this.props ? this.props.displayTools : ['zoomIn', 'zoomOut', 'prev', 'next', 'download', 'close']

    return (
      <div className='lightbox-viewer lightbox-viewer-transition' style={visible ? showStyle : hiddenStyle}>
        <div className='lightbox-viewer-mask' onClick={this.onCloseClick}></div>
        {!drawboxVisible && imgvActiveImage ?
          <LightboxViewer
            imgvImages={imgvImages}
            imgvActiveImage={imgvActiveImage}
            activeIndex={activeIndex}
            onChange={this.onChange}
            customTools={customTools}
            displayTools={displayTools}
            onDeleteInfoClick={this.onDeleteInfoClick}
            onAddInfoClick={this.onAddInfoClick}
            setImageSize={this.setImageSize}
            onDownloadClick={this.onDownloadClick}
            onCloseClick={this.onCloseClick}
            onSaveClick={this.onSaveClick}
            showToolbar={showToolbar}
            showNav={showNav}
            showAttribute={showAttribute}
          />
          : <Drawbox
            src={url}
            onCloseClick={this.onCancelDrawClick}
            onSaveClick={this.onSaveAddInfoClick}
            dataURL={base64DataURL}
          />}
      </div>
    )
  }
}

Lightbox.propTypes = {
  visible: PropTypes.bool,
  withDrawer: PropTypes.bool,
  imgvImages: PropTypes.array,
  onCancel: PropTypes.func,
}

Lightbox.defaultProps = {
  visible: false,
  imgvImages: [],
  withDrawer: false,
  showToolbar: true,
  showAttribute: true,
  showNav: true
}

export default Lightbox;
