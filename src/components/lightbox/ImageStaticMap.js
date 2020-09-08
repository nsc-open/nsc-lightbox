import React, { Component } from 'react'
import PropTypes from 'prop-types'
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { getCenter } from "ol/extent";
import ImageLayer from "ol/layer/Image";
import Projection from "ol/proj/Projection";
import ImageStatic from "ol/source/ImageStatic";
import { getWindowSize } from './ui'
import { Spin } from 'antd'

// Map views always need a projection.  Here we just want to map image
// coordinates directly to map coordinates, so we create a projection that uses
// the image extent in pixels.
const { width, height } = getWindowSize()

class ImageStaticMap extends Component {
  imgObj = null
  map = null
  extent = null
  projection = null
  view = null

  imageLayer = null
  imageSource = new ImageStatic({})

  imageInfoSource = null
  imageInfoLayer = null

  constructor(ctx) {
    super(ctx)
    this.state = {
      spinning: false
    }
  }

  componentDidMount() {
    const { dataURL, showInfo } = this.props
    this.initMap()
    this.addImage(() => {
      showInfo ? this.addImageInfoLayer(dataURL) : this.removeImageInfoLayer()
    })
  }

  componentDidUpdate(prevProps) {
    const { dataURL, imageWidth, imageHeight } = this.props

    if (prevProps.showInfo !== this.props.showInfo) {
      if (this.props.showInfo) {
        this.addImageInfoLayer(dataURL)
      } else {
        this.removeImageInfoLayer()
      }
    }
    if (prevProps.src !== this.props.src || prevProps.dataURL !== this.props.dataURL) {
      this.changeImage(this.props.dataURL, imageWidth, imageHeight)
    }
    this.view && this.view.animate({
      zoom: this.props.mapZoom,
      center: getCenter(this.extent),
      duration: 600
    })
  }

  initMap = () => {
    var map = new Map({
      target: this.mountNode,
      controls: [],
    })
    this.map = map
  }

  getImageSize = ({ src, imageWidth = 0, imageHeight = 0 }, callback) => {
    const { getImageSize } = this.props
    let width = imageWidth
    let height = imageHeight

    if (src && !(imageWidth || imageHeight)) {
      const img = new Image()
      img.src = src
      img.onload = function () {
        width = img.width
        height = img.height
        getImageSize && getImageSize({ width, height })
        callback({ width, height })
      }
    } else {
      getImageSize && getImageSize({ width, height })
      callback({ width, height })
    }
  }

  addImage = (callback) => {
    this.removeImage()
    const { src, imageWidth, imageHeight } = this.props
    this.setState({ spinning: true })
    this.getImageSize({ src, imageWidth, imageHeight }, ({ width, height }) => {
      this.extent = [0, 0, width, height]
      this.projection = new Projection({
        code: "xkcd-image",
        units: "pixels",
        extent: this.extent
      });
      this.imageSource = new ImageStatic({
        url: src,
        projection: this.projection,
        imageExtent: this.extent
      })
      this.imageLayer = new ImageLayer({
        source: this.imageSource
      })
      this.view = new View({
        projection: this.projection,
        center: getCenter(this.extent),
        zoom: 1,
        maxZoom: 5
      })
      this.map.addLayer(this.imageLayer)
      this.map.setView(this.view)
      this.setState({ spinning: false })
      callback && callback()
    })
  }

  removeImage = () => {
    if (this.imageLayer) {
      this.map.removeLayer(this.imageLayer)
      this.imageSource = null
      this.imageLayer = null
    }
  }

  addImageInfoLayer = (src) => {
    this.removeImageInfoLayer()

    this.imageInfoSource = new ImageStatic({
      url: src,
      projection: this.projection,
      imageExtent: this.extent
    })
    this.imageInfoLayer = new ImageLayer({
      source: this.imageInfoSource
    })
    this.map.addLayer(this.imageInfoLayer)
  }

  removeImageInfoLayer = () => {
    if (this.imageInfoLayer) {
      this.map.removeLayer(this.imageInfoLayer)
      this.imageInfoSource = null
      this.imageInfoLayer = null
    }
  }

  changeImage = (dataURL) => {
    this.addImage(() => {
      this.addImageInfoLayer(dataURL)
    })
  }

  render() {
    const { spinning } = this.state
    return (
      <>
        {spinning ? <Spin size="large" style={{ position: 'absolute', zIndex: 99999, left: '50%', top: '50%' }} /> : null}
        <div ref={m => this.mountNode = m} className="map" style={{ width: '100%', height: '100%' }}></div>
      </>
    )
  }
}


ImageStaticMap.propTypes = {
  showInfo: PropTypes.bool
}

ImageStaticMap.defaultProps = {
  showInfo: true
}

export default ImageStaticMap