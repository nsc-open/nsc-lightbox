import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Modal, Button, message } from 'antd'


let zIndex = 200
const height = 1200

const noop = () =>{

}

class BaseModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  isControlled () {
    return 'visible' in this.props
  }

  componentWillReceiveProps (nextProps) {
    if (this.isControlled() && nextProps.visible && !this.props.visible) {
      this.props.onVisible()
    }
  }

  showModalHandler = () => {
    this.props.onClick()
    this.setState({ visible: true })

    this.props.onVisible()
  }

  hideModalHandler = () => {
    this.setState({ visible: false })
  }

  okHandler = () => {
    message.destroy()
    const result = this.props.onOk()

    if (!this.isControlled()) {
      if (result.then) {
        result.then(r => r !== false && this.hideModalHandler())
      } else if (result !== false) {
        this.hideModalHandler()
      }
    }
  }

  cancelHandler = () => {
    message.destroy()
    if (!this.isControlled()) {
      this.hideModalHandler()
    }
    this.props.onCancel()
  }

  render () {
    const { displayButtons,customButtons, children, label, title, okText, cancelText, width = 600,
      autoSize, editable, modal, forceRender, ...restProps } = this.props
    const isControlled = this.isControlled()
    const visible = isControlled ? this.props.visible : this.state.visible

    const footerButtons = [
      <Button key='cancel' onClick={this.cancelHandler}>{cancelText}</Button>,
      <Button key='ok' onClick={this.okHandler} type='primary' disabled={!editable}>{okText}</Button>
    ].filter(c => {
      if (displayButtons[0] === '*') {
        return true
      } else {
        return displayButtons.includes(c.key)
      }
    })

    return (
      <span>
        {isControlled ? null : <span onClick={this.showModalHandler}>{label}</span>}
        <Modal
          ref={ref => this.modal = ref}
          {...restProps}
					title={ title }
					visible={visible}
					onOk={this.okHandler}
					onCancel={this.cancelHandler}
					width={width}
					destroyOnClose={true}
					footer={footerButtons.concat(customButtons)}
          {...(modal || {mask: false, maskClosable: false})}
				>
          <div style={autoSize ? {height: height * 0.60, overflowY: 'auto', overflowX: 'hidden' } : {maxHeight: height * 0.60, overflowY: 'auto', overflowX: 'hidden' }}>
            {forceRender ? children : (visible ? children : null)}
          </div>
        </Modal>
      </span>
    )
  }
}

BaseModal.BaseModal = {
  label: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,             // visible can be controlled from outside
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onClick: PropTypes.func,
  onVisible: PropTypes.func,
  editable: PropTypes.bool,
  displayButtons: PropTypes.array,
  autoSize: PropTypes.bool,
  modal: PropTypes.bool,
  forceRender: PropTypes.bool
}

BaseModal.defaultProps = {
  label: '弹框',
  title: '无标题',
  onOk: noop,
  onCancel: noop,
  okText: '确认',
  cancelText: '取消',
  onClick: noop,
  onVisible: noop,
  editable: true,
  displayButtons: ['*'],
  autoSize: true,
  modal: true,
  forceRender: true,
  customButtons:[]
}

export default BaseModal
