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
  uri: "http://corridorcleaningphoto.oss-cn-beijing.aliyuncs.com/65272c2cfeeb140e3f889ce26317bdae?OSSAccessKeyId=STS.NSrXAp1BQCmPymodiPqZ8iBFZ&Expires=1624949065&Signature=ZZVZPWkO%2FdGfF9kO%2BkiqLaLKUKc%3D&security-token=CAISjAZ1q6Ft5B2yfSjIr5DHE%2FvE3J1w9K%2B7e0vegGkFfdUUhoftuDz2IHpEf3NhAO8Yt%2Fswn2pY5vwclq19UZpOHfxD%2FxC9qcY5yxioRqackXPZj9Vd%2BnXMewW6Dxr8w7WMAYHQR8%2FcffGAck3NkjQJr5LxaTSlWS7TU%2FiOkoU1QdkLeQO6YDFaZrJRPRAwkNIGEnHTOP2xSEmI5FDdF011oAFxpHpi4KCkuK2m5wHZkUfxx51exc34KYP2aNJ3btUtEYW%2B2%2FZsd6bGyiVU5hFM9aF5lKxD5TC1VLj%2FbnBV5xKZSbS2lvRkMA5%2BYIUjBqdAt4KSvPZku%2BvV5fKVrhFWJrN6Xjj4ToKty9emfeSyLYQBaKrcMXbA2cz1H%2FuTiQ4%2FZm8BPw5nYscoLmQKaSYhUTbHMKSqih2oKQ6oUPqCy7pkk8g3nV7v58CLK1%2BVSLGU2CAZPJAkb0Q0MFlUr32DH4YCdwtTCQ0FY5%2BeUYR0aj1HtKrspne8fyZ8z3ZRzYucAvTNofIwZJnYVJBL2pZ%2FAZNdqDkSUkjQQbCjgVtuJA4De7tN17T3MpKS8aKMxP7pAdTLEfcaoF5XA0Sz3SOGUiFXNjajpI9hO1yD8IHO0azF9dZsHRMylMM9YCiBddFy1QIEh4K58xWU9sL6T3mu5RBW09LE%2Fo5Jmz0GG%2FC%2FmL29syL5tn6darVb%2FcDMQz9XXAiQcX50y%2Bzo1BBhnR0alHyuMBsy8kmY0X3KHPcWyfuW3HhJcNEx7e3TUGWn5X4yS4DLsbAQUqZ9YeBHVLOw0Bl1gb%2BVlX%2FdkonFtggfJ4yQXrA6YolOLgvu6aD2F78%2FkvNjCDmMAcw6sZdFlTCMxCku0v8Lc9lBcCg%2BPos%2BZqqOqoOarooGmbUg8PKcJ5ikX7%2F3jLKdKjHIUz0G1%2Bl6slE0LjyTrraIQFriCvR0%2B1nXih9dCBS7gtmlqGdYA8ndANtQ3O5dNy3c0ipVNvI3B%2FU%2B8oz3bYw%2FLXcDLJxnVFmuJfJn0%2BteJTV%2F%2FaosKKjQBS3C8FjU4f%2FxlwCGQ8kagAEzoNLiNOb7n00hMoK7SlargzUU4fhXx%2BJqCSrHy%2FyH8vc8ncSTqcS37rtII31jFSfpH9rPgErNmNyhqDWLXOWAKGrpdSXQdNfc33UjdV57UalcybCsNgr%2FzA%2Fy4xjoYUgequSbIKJmO81JiQpUlNKHb8y2hFjI5jP9eTyAXVxD6g%3D%3D",  volId: "ef31a5d3-eb54-11ea-abe5-735dc8c1a294",
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
