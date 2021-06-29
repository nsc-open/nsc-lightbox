import React, { Component } from 'react'

const prefixCls = 'lightbox-viewer'

export default class LightboxNav extends Component {
  handleChangeImg = (newIndex) => {
    if (this.props.activeIndex === newIndex) {
      return
    }
    this.props.onChangeImg(newIndex)
  }

  render() {
    const { activeIndex = 0 } = this.props
    let marginLeft = `calc(50% - ${activeIndex + 1} * 31px)`
    let listStyle = {
      marginLeft: marginLeft,
    }
    return (
      <div className={`${prefixCls}-navbar`}>
        <ul className={`${prefixCls}-list ${prefixCls}-list-transition`} style={listStyle}>
          {this.props.images.map((item, index) =>
            <li
              key={index}
              className={index === activeIndex ? 'active' : ''}
              onClick={() => { this.handleChangeImg(index) }}
            >
              <img src={item.uri} />
            </li>,
          )
          }
        </ul>
      </div>
    )
  }

}