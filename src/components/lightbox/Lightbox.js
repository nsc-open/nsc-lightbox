
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import LightboxViewer from './LightboxViewer';
import Drawbox from '../drawbox/Drawbox';
import '../../assets/fonts/icon-font/iconfont.css'
import './index.css'
import "react-img-editor/assets/index.css"

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

  onSaveClick = (dataURL) => {
    const { imgvActiveImage } = this.state
    if (dataURL) {
      const result = this.props.onAddInfoClick(imgvActiveImage, dataURL)
      if (result.then) {
        result.then(r => r !== false && this.onCloseClick())
      } else if (result !== false) {
        this.onCloseClick()
      }
    }
  }

  onDeleteClick = () => {
    const { imgvActiveImage } = this.state
    const result = this.props.onDeleteInfoClick(imgvActiveImage)
    if (result.then) {
      result.then(r => r !== false && this.onCloseClick())
    } else if (result !== false) {
      this.onCloseClick()
    }
  }

  onCloseClick = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  render() {
    const { imgvImages, visible, withDrawer, customTools, activeIndex, showAttribute, showNav, showToolbar } = this.props
    const { imgvActiveImage, drawboxVisible } = this.state
    const { uri, base64DataURL } = imgvActiveImage

    const showStyle = {
      'opacity': 1,
      'display': 'block'
    }

    const hiddenStyle = {
      'display': 'none'
    }

    const displayTools = withDrawer || customTools ? ['*'] : 'displayTools' in this.props ? this.props.displayTools : ['zoomIn', 'zoomOut', 'prev', 'next', 'close',]

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
            onCloseClick={this.onCloseClick}
            showToolbar={showToolbar}
            showNav={showNav}
            showAttribute={showAttribute}
          />
          : <Drawbox
            src={uri}
            onCloseClick={this.onCloseClick}
            onSaveClick={this.onSaveClick}
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
