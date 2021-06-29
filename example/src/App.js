import React, { Component } from 'react'
import { Icon, message, Button } from 'antd'
import { Lightbox } from 'nsc-lightbox'
import { Uploader } from 'nsc-uploader'
import 'antd/dist/antd.css'
import BaseModal from './BaseModal'
import Url from 'url-parse'

const OSS = require('ali-oss')

const isDoc = (img) => {
  return img.fileExt.indexOf('doc') !== -1 || img.fileExt.indexOf('xls') !== -1
}

const OSS_ENDPOINT = ''
const OSS_BUCKET = ''
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
  uri: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  volCode: null,
  volId: "ef31a5d3-eb54-11ea-abe5-735dc8c1a294",
  volRevision: "7",
}, {
  category: "print",
  createdAt: "2020-09-07 15:34:13",
  createdBy: "1732",
  encodedFileName: "647d57d9d156b144b276c0fcae9fd761_1599459834788",
  fileExt: "png",
  fileName: "微信图片_20200616152747.png",
  fileSize: "41219",
  fileType: "png",
  id: "24137692-f0df-11ea-8146-f9a5d6b3bf59",
  isDeleted: null,
  sortNo: "2",
  updatedAt: "2020-09-07 15:52:55",
  updatedBy: "1732",
  uri: "",
  volRevision: "7",
}
]

const ossParams = {
  region: OSS_ENDPOINT,
  bucket: '',
  accessKeyId: "",
  accessKeySecret: "",
  Expiration: "2021-02-25T07:36:04Z",
  stsToken: ""
}


class CusModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: defaultFiles,
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

  onPreview =  () => {
    const { fileList } = this.state
    const lightboxImages = fileList
    const lightboxIndex = 0
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


    const displayTools =['addInfo', 'showInfo', 'deleteInfo', 'zoomIn', 'zoomOut', 'prev', 'next', 'download', 'close',]
    return (
        <div >
          <a onClick={()=>this.onPreview()}>预览</a>
          {previewVisible && lightboxImages.length ? <Lightbox
            visible={previewVisible}
            imgvImages={fileList}
            activeIndex={lightboxIndex}
            displayTools={displayTools}
            onCancel={this.onCancel}
            showNav={true}
          /> : null
          }
        </div>
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
