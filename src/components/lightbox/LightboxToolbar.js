
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'antd/lib/tooltip'
import 'react-img-editor/assets/index.css'
import "react-img-editor/assets/iconfont.css"

const prefixCls = 'react-img-editor'

const defaultTools = [
  { name: 'zoomIn', iconfont: 'icon-zoomIn', title: '放大' },
  { name: 'zoomOut', iconfont: 'icon-zoomOut', title: '缩小' },
  { name: 'prev', iconfont: 'icon-prev', title: '上一项' },
  { name: 'next', iconfont: `icon-next`, title: `下一项` },
  { name: 'close', iconfont: 'icon-close', title: '关闭' },
]

class LightboxToolbar extends Component {

  static defaultProps = {
    tools: defaultTools
  }

  handleClick(btnKey) {
    const propName = `on${btnKey[0].toUpperCase()}${btnKey.substr(1)}Click` // onApplyClick, onReturnClick, onAlarmClick
    this.props[propName] && this.props[propName](btnKey)
  }

  renderTool(tool) {
    const { currentTool } = this.props
    const isActivated = !!(currentTool && currentTool === tool.name)
    const isDisabled = tool.disable
    const isHidden = tool.hidden
    return (
      <Tooltip
        key={tool.name}
        title={tool.title}
        placement="bottom"
        overlayClassName={`${prefixCls}-tooltip`}
      >
        <span
         className={`${prefixCls}-toolbar-icon ${isActivated ? 'activated' : ''} ${isDisabled ? 'disabled' : ''}`}
          style={{ display:isHidden ? 'none' :'block' }}
        >
          <i title={tool.title} className={`iconfont ${tool.iconfont}`} onClick={_ => !isDisabled && this.handleClick(tool.name)} />
        </span>
      </Tooltip>
    )
  }

  render() {
    const { tools } = this.props
    return (
      <div className={`${prefixCls}-toolbar`} style={{ width: '100%' }}>
        {
          tools.map(item => this.renderTool(item))
        }
      </div>
    )
  }
}

LightboxToolbar.propTypes = {
  tools: PropTypes.array,
}


export default LightboxToolbar