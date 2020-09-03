import React, { Component } from 'react'
import { Icon, message, Modal } from 'antd'
import { Lightbox } from 'nsc-lightbox'
import { Uploader } from 'nsc-uploader'
import 'antd/dist/antd.css'
const OSS = require('ali-oss')

const isDoc = (img) => {
  console.log(img)
  return img.fileExt.indexOf('doc') !== -1 || img.fileExt.indexOf('xls') !== -1
}

const OSS_ENDPOINT = 'oss-cn-beijing'
const OSS_BUCKET = 'corridorcleaningphoto'
const defaultFiles = [{
  cloudDir: null,
  comment: null,
  createdAt: "2020-06-12 09:13:55",
  createdBy: null,
  encodedFileName: "a81b88e1d05964f450d9e0c3b98ea084_1591923471032",
  fileExt: "doc",
  fileName: "360-photo-2",
  fileSize: 34250,
  fileType: "application/doc",
  id: "fc1fbd30-ac49-11ea-96d1-7dc79c40ecd3",
  isDeleted: null,
  setId: "c0660b70-ac47-11ea-b571-cd04ff54552a",
  sortNo: null,
  title: null,
  updatedAt: "2020-06-12 09:13:54",
  updatedBy: "74",
  uploadedFrom: null,
  uri: 'http://47.92.150.213:7040/api/workReports/93770d30-af0d-11ea-a637-236812180fd0'
}, {
  cloudDir: null,
  comment: null,
  createdAt: "2020-06-12 09:13:50",
  createdBy: null,
  encodedFileName: "a81b88e1d059640d9e0c3b98ea084_159192341032",
  fileExt: "pdf",
  fileName: "2",
  fileSize: 34250,
  fileType: "application/pdf",
  id: "fc1fbd30-ac49-11ea-96-7dc79c40ecd3",
  isDeleted: null,
  setId: "c0660b70-ac47-11ea-b571-cd0sf54s52a",
  sortNo: null,
  title: null,
  updatedAt: "2020-06-12 09:13:50",
  updatedBy: "74",
  uploadedFrom: null,
  uri: 'http://47.92.150.213:7040/api/workReports/93770d30-af0d-11ea-a637-236812180fd0'
}
]

const ossParams = {
  region: OSS_ENDPOINT,
  bucket: OSS_BUCKET,
  accessKeyId: "STS.NU4CMorP1NfvoLLGuznWGyMtR",
  accessKeySecret: "6Gta2wEzD7NNHmidnaBQxWCCrNt8M2jxKEQkNq9hKbKH",
  stsToken: "CAISjgJ1q6Ft5B2yfSjIr5aBCPfbn48Q+aSdbWr9o3UvYthrlojfsDz2IHpEf3NhAO8Yt/swn2pY5vwclq19UZpOHY4nhWbcqMY5yxioRqackf7XhOV2tf/IMGyXDAGBq622Su7lTdTbV+6wYlTf7EFayqf7cjPQMD7INoaS29wdLbZxZASjaidcD9p7PxZrrNRgVUHcLvGwKBXn8A2yaUNjoVh7kngtq/b9kI++kkOP0gagl75P/NisfMn+NJJWUc0hA4vv7otfbbHc1SNc0R9O+ZptgbZMkTW95YvNWAMAukrYarWLqYc/fFUnfNszH69Vsf77juZkve/ekYv6zRtXNP1SST7YQI2wOTsxuiVz4L0agAFG+bXyYKdWozoKCoEQGn6bMt8tHbRQam+a11tQ9mppEhjXN+stUcw8B1i2iWQxua5r2ytHJr3KU8caOzdCFyZsDhEt7FDlSetHZDluu57ebSssWH3zrchKnfvtwQmN29ZAU4ZThpsG/HjFAZHCyn8IqKH0qnu+vZGzR7wfOrb0rQ=="
}

class App extends Component {
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

  handlePreview = async (file) => {
    console.log(file)
    const { fileList } = this.state
    const lightboxImages = fileList.map(a => ({ ...a, alt: a.name, uri: isDoc(a) ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(this.signatureUrl(a.uri))}` : this.signatureUrl(a.uri) }))
    const lightboxIndex = (fileList.map(a => a.id).indexOf(file.id) || 0)
    this.setState({
      lightboxImages,
      previewVisible: true,
      lightboxIndex
    })
  }

  onDownload = (file) => {
    downloadFile(signatureUrl(file.uri), file.fileName)
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
    const displayTools = ['zoomIn', 'addInfo', 'zoomOut', 'prev', 'next', 'close',]
    return (
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
        /> : null
        }
      </div>

    )
  }
}


export default App
