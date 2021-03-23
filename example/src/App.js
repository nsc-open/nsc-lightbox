import React, { Component } from 'react'
import { Icon, message, Button } from 'antd'
import { Lightbox } from 'nsc-lightbox'
import { Uploader } from 'nsc-uploader'
import 'antd/dist/antd.css'
import BaseModal from './BaseModal'

const OSS = require('ali-oss')

const isDoc = (img) => {
  return img.fileExt.indexOf('doc') !== -1 || img.fileExt.indexOf('xls') !== -1
}

const OSS_ENDPOINT = 'oss-cn-beijing'
const OSS_BUCKET = 'corridorcleaningphoto'
const defaultFiles = [{
  category: "print",
  createdAt: "2020-09-07 15:34:13",
  createdBy: "1732",
  encodedFileName: "8e67209cd9a58cdfc9469edfa1484866_1599459834761",
  fileExt: "jpg",
  fileName: "测试图片3.jpg",
  fileSize: "268713",
  fileType: "image/jpeg",
  id: "24137691-f0df-11ea-8146-f9a5d6b3bf59",
  isDeleted: null,
  sortNo: "1",
  updatedAt: "2020-09-07 15:52:55",
  updatedBy: "1732",
  uri: "http://your.url",
  volCode: null,
  volId: "ef31a5d3-eb54-11ea-abe5-735dc8c1a294",
  volRevision: "7",
}
]

const ossParams = {
  region: OSS_ENDPOINT,
  bucket: OSS_BUCKET,
  accessKeyId: "yourkey",
  accessKeySecret: "yoursecret",
  Expiration: "2021-03-15T08:50:41Z",
  stsToken: ""
}


class CusModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      previewVisible: false,
    }
  }

  getOssParams = () => new Promise((resolve, reject) => {
    resolve(ossParams)
  })

  signatureUrl = (url) => {
    const client = new OSS(ossParams)
    const index = url.lastIndexOf('/') + 1
    return client.signatureUrl(url.substring(index))
  }

  onFileChange = (file, fileList) => {
    this.setState({ fileList: fileList })
  }

  handlePreview = async (file) => {
    console.log(file)
    const { fileList } = this.state
    const lightboxImages = fileList.map(a => ({ ...a, alt: a.name, uri: isDoc(a) ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(this.signatureUrl(a.uri))}` : a.uri }))
    const lightboxIndex = (fileList.map(a => a.id).indexOf(file.id) || 0)
    this.setState({
      lightboxImages,
      previewVisible: true,
      lightboxIndex
    })
  }

  onDownload = (file) => {
    window.open(this.signatureUrl(file.uri))
  }

  onSortEnd = (oldList, newList) => {
    console.log(oldList, newList)
  }

  onChange = ({ file }) => {
    console.log(file)
  }

  beforeUpload = ({ file }) => {
    console.log(file)
  }

  onCancel = () => {
    console.log('onCancel')
    this.setState({ previewVisible: false, lightboxImages: [] })
  }

  onVisible = () => {
    this.setState({ fileList: defaultFiles })
  }

  render() {
    const { previewVisible, lightboxImages, lightboxIndex, fileList } = this.state

    let accept = "*"

    const uploadProps = {
      getOssParams: this.getOssParams,
      multiple: true,
      dragSortable: false,
      onFileChange: this.onFileChange,
      maxFileSize: 2,
      accept,
      onPreview: this.handlePreview,
      onSortEnd: this.onSortEnd,
      onDownload: this.onDownload,
      defaultFiles: fileList,
      showUploadList: 'showUploadList' in this.props ? this.props.showUploadList : { showDownloadIcon: true },
      showRadioButton: 'showRadioButton' in this.props ? this.props.showRadioButton : {
        placement: 'left',
        radioItems: [
          { key: 'picture-card', value: '网格' },
          { key: 'text', value: '列表' }
        ]
      }
    }
    const displayTools = ['zoomIn', 'zoomOut', 'prev', 'next', 'close',]
    return (
      <BaseModal onVisible={this.onVisible}>
        <div style={{ margin: '50px', width: '50%' }}>
          <Uploader
            {...uploadProps}
            showUploadList={{ showDownloadIcon: true }}
          />
          {previewVisible && lightboxImages.length ? <Lightbox
            visible={previewVisible}
            imgvImages={lightboxImages}
            activeIndex={lightboxIndex}
            displayTools={displayTools}
            onCancel={this.onCancel}
            showNav={true}
          /> : null
          }
        </div>
      </BaseModal>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: defaultFiles,
      previewVisible: false,
    }
  }
  render() {
    return (
      <CusModal><Button>click</Button></CusModal>
    )
  }
}
export default App
