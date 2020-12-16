import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import './IFrame.css'

/**
 * props.src
 * props.style
 */
class IFrame extends Component {

  state = {
    loading: true
  }

  /* shouldComponentUpdate (nextProps, nextState) {
    if (nextState.loading !== this.state.loading) {
      return true
    } else {
      return nextProps.src !== this.props.src
    }
  } */

  handleOnLoad() {
    this.setState({ loading: false })
  }

  getIFrame() {
    return this.refs.frame
  }

  render() {
    const { src, children ,style } = this.props
    return (
      <div className='container'>
        <Spin spinning={this.state.loading} className='spinner' />
        <iframe ref="frame" className='iframe' style={{...style}} src={src} onLoad={() => this.handleOnLoad()}></iframe>
        {!this.state.loading ? children : null}
      </div>
    )
  }
}

IFrame.propTypes = {
  src: PropTypes.string.isRequired
}

export default IFrame