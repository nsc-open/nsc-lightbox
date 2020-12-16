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
  uri: "http://corridorcleaningphoto.oss-cn-beijing.aliyuncs.com/8e67209cd9a58cdfc9469edfa1484866_1599459834761",
  volCode: null,
  volId: "ef31a5d3-eb54-11ea-abe5-735dc8c1a294",
  volRevision: "7",
}, {
  category: "print",
  createdAt: "2020-09-07 15:34:13",
  createdBy: "1732",
  encodedFileName: "647d57d9d156b144b276c0fcae9fd761_1599459834788",
  fileExt: "pdf",
  fileName: "微信图片_20200616152747.pdf",
  fileSize: "41219",
  fileType: "pdf",
  id: "24137692-f0df-11ea-8146-f9a5d6b3bf59",
  isDeleted: null,
  sortNo: "2",
  updatedAt: "2020-09-07 15:52:55",
  updatedBy: "1732",
  uri: "http://corridorcleaningphoto.oss-cn-beijing.aliyuncs.com/72fccc852992f4cedb9ecd72a4347655?OSSAccessKeyId=STS.NTbeoxomfetxDweJiVxEhYLHy&Expires=1608116352&Signature=swQTXSCmzUePlfllyRXlS742gjk%3D&security-token=CAISjgJ1q6Ft5B2yfSjIr5fXLtXMgrJH0raTRlHUrmkDdMpEtonjmzz2IHpEf3NhAO8Yt%2Fswn2pY5vwclq19UZpOHadnu3n%2BqMY5yxioRqackf7XhOV2tf%2FIMGyXDAGBq622Su7lTdTbV%2B6wYlTf7EFayqf7cjPQMD7INoaS29wdLbZxZASjaidcD9p7PxZrrNRgVUHcLvGwKBXn8A2yaUNjoVh7kngtq%2Fb9kI%2B%2BkkOP0gagl75P%2FNisfMn%2BNJJWUc0hA4vv7otfbbHc1SNc0R9O%2BZptgbZMkTW95YvNWAMAukrYarWLqYc%2FfFUnfNszH69Vsf77juZkve%2FekYv6zRtXNP1SST7YQI2wOTsxuiVz4L0agAE0BPxohev1fAz9TK99InwxmyqaqCTRW1qz9oa4sn7aaeoRVU4a9uUp2OYeIHCXKTWq8vKUKXX7aZvo3YLRQWvyMYfiDw%2BUvmW%2F7KUpuAlt0VRtUOTBCRsm0lnjKINwiGxNmgnrcysTrOzNzxcRlSIUIo2YaVfnYLysPeIyHjNZbQ%3D%3D",
  volCode: null,
  volId: "ef31a5d3-eb54-11ea-abe5-735dc8c1a294",
  volRevision: "7",
}
]

const ossParams = {
  region: OSS_ENDPOINT,
  bucket: OSS_BUCKET,
  accessKeyId: "STS.NUff6x81sVKWWBzrh8LSJuurh",
  accessKeySecret: "F5ARFnrAZahw7HHfwkR9Lu7StxJ86Pw9EwRyDvpaWPTz",
  Expiration: "2020-09-08T07:27:30Z",
  stsToken: "CAISjgJ1q6Ft5B2yfSjIr5bTLYzM1e5S4Ym8VWTLlmhtQNxmmrDZijz2IHpEf3NhAO8Yt/swn2pY5vwclq19UZpOHYIJ9kfeqMY5yxioRqackf7XhOV2tf/IMGyXDAGBq622Su7lTdTbV+6wYlTf7EFayqf7cjPQMD7INoaS29wdLbZxZASjaidcD9p7PxZrrNRgVUHcLvGwKBXn8A2yaUNjoVh7kngtq/b9kI++kkOP0gagl75P/NisfMn+NJJWUc0hA4vv7otfbbHc1SNc0R9O+ZptgbZMkTW95YvNWAMAukrYarWLqYc/fFUnfNszH69Vsf77juZkve/ekYv6zRtXNP1SST7YQI2wOTsxuiVz4L0agAFoSOwdbiAPck0UjcfPCoCvSfnnoGxpTWioGZ2YRE86rJ7hdmOJXI1KpCsh8sMniuXrw8pjbKmoNike9ql/WbJIk427uH4li34huGnWT4vp21oYunWj9TqLTMTG22ZAgvfp8a+pX2YZbvuNW7N+CIfkjM0M6Bhv0p/BVkQzmOKRYQ=="
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
            showNav={false}
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
