# Install

```
  npm install nsc-uploader
```

# 文件上传


## 文件先上传至阿里云
  
  控制文件显示顺序与文件原始顺序一致


## 上传控制

  限制文件大小、数量、格式


## 文件拖拽排序，上传完成后可以支持拖拽排序


## 文件展示

  初始化时显示已上传的文件列表
  显示原始文件名，可以切换展示样式，grid或list


## API

 参数 | 说明 | 类型 | 默认值 
 -- | -- | -- | --
 type |上传组件类型，默认'select'，设置为‘dragger'时，可拖拽上传|string| 无
 getOssParams |Promise,返回OSS实例参数，详见 [getOssParams](#getOssParams)|Function| 无
 maxFileSize |最大文件大小(MB)|number| 
 maxFileNum |最多上传文件数量|number| 
 accept |接受上传的文件类型,详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)|string|无
 fileErrorMsg |文件大小、格式、数量不满足时的提示信息，详见[fileErrorMsg](#fileErrorMsg)|array|无
 listType |文件展示方式，支持三种基本样式 text, picture 和 picture-card|array|'picture-card'
 dragSortable |控制是否可拖拽排序|boolean|false
 defaultFiles |默认已经上传的文件列表|array|[]
 onFileChange |上传文件成功后的回调，详见 [onFileChange](#onFileChange) | Function(file,fileList): void | 无 
 multiple |是否支持多选文件 | boolean | false 
 autoSave |是否自动上传 |boolean|true
 onSave |文件上传到服务器的回调 |Function(file): void|无
 onRemove |服务器删除文件的回调 |Function(file): void|无
 onSortEnd | 文件拖拽排序回调，返回排序前文件列表和排序后文件列表 |Function(oldFileList,newFileList): void|无
 disabled | 是否禁用 | boolean | false 
 name | 发到后台的文件参数名 | string | 'file' 
 showUploadList | 是否展示文件列表, 可设为一个对象，用于单独设定 `showPreviewIcon`, `showRemoveIcon` 和 `showDownloadIcon` | Boolean or { showPreviewIcon?: boolean, showRemoveIcon?: boolean, showDownloadIcon?: boolean } | true 
 showUploadButton | 是否展示上传按钮, | boolean | true
 showRadioButton | 是否展示显示样式切换单选按钮, 可设为一个对象，用于单独设定 `placement`(按钮位置，默认'right'), `radioItems`详见 [radioItems](#radioItems) ,`showRadioTitle`| Boolean or { placement: 'right' || 'center' || 'right', radioItems?: Array ,showRadioTitle?: boolean} | boolean | true
 customRadioButton | 自定义样式切换组件 | React.ReactNode | 

### getOssParams 
 
  ```js
  let STS_TOKEN = null
  getUploadClientParams = (token) => {
    return {
      accessKeyId: token.AccessKeyId,
      accessKeySecret: token.AccessKeySecret,
      stsToken: token.SecurityToken,
      region: OSS_ENDPOINT,
      bucket: OSS_BUCKET
    };
  }

  getOssParams = () => {
    return new Promise((resolve, reject) => {
      if (!STS_TOKEN || (STS_TOKEN && (new Date(STS_TOKEN.Expiration) < Date.now()))) {
        attachmentAPI.getSTSToken().then(r => {
          if (r) {
            STS_TOKEN = r
            resolve(getUploadClientParams(STS_TOKEN))
          } else {
            reject()
          }
        })
      } else {
        resolve(getUploadClientParams(STS_TOKEN))
      }
    })
  }
  ```

### fileErrorMsg

 > 自定义文件大小、格式、数量错误提示信息

  ```js
    {
      fileExtensionErrorMsg: '', //文件格式错误提示信息
      fileSizeErrorMsg:'' , //文件过大提示信息
      fileNumerErrorMsg: '' //文件数量过多提示信息
    }
  ```
### onFileChange

> 文件列表状态改变的回调，调用这个函数，刷新文件列表。

返回为：

```js
{
  file:{/* ... */ }, //当前的文件对象
  fileList: [ /* ... */ ] ，//当前的文件列表
}
```
### radioItems

> 自定义单选组合,格式为：

```js
[
  { key:'picture-card',value:'网格' },
  { key:'text',value:'列表' },
  { key:'picture',value:'图片列表' },
]
```


