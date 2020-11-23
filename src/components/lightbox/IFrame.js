import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator } from 'antd-mobile';
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
    const { src, children } = this.props
    return (
      <div className={'container'}>
        <ActivityIndicator
          toast
          text="Loading..."
          animating={this.state.loading}
        />
        <iframe ref="frame" className={'iframe'} src={src} onLoad={() => this.handleOnLoad()}></iframe>
        {!this.state.loading ? children : null}
      </div>
    )
  }
}

IFrame.propTypes = {
  src: PropTypes.string.isRequired
}

export default IFrame