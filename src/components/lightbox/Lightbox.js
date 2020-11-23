
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import LightboxViewer from './LightboxViewer';
import '../../assets/fonts/icon-font/iconfont.css'
import './index.css'

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

  onSaveClick = (dataURL) => {
    const { imgvActiveImage } = this.state
    if (dataURL) {
      const result = this.props.onAddInfoClick(imgvActiveImage, dataURL)
      if (result.then) {
        result.then(r => r !== false && this.onCloseClick())
      } else if (result !== false) {
        this.onCloseClick()
      }
    } else {
      this.onDeleteClick()
    }
  }


  onCloseClick = () => {
    console.log('close')
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  render() {
    const { imgvImages, visible, withDrawer, customTools ,activeIndex ,toolposition } = this.props
    const { imgvActiveImage } = this.state
    console.log('imgvActiveImage',imgvActiveImage)
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
        {imgvActiveImage &&
          <LightboxViewer
            imgvImages={imgvImages}
            imgvActiveImage={imgvActiveImage}
            activeIndex={activeIndex}
            onChange={this.onChange}
            customTools={customTools}
            displayTools={displayTools}
            onCloseClick={this.onCloseClick}
            toolposition={toolposition}
          />
        }
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
  toolposition:'bottom'
}

export default Lightbox;
