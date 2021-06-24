import Plugin from "react-img-editor/es/plugins/Plugin";

export default class Close extends Plugin {
  constructor(options) {
    super(options)
    this.onCloseClick = options.onCloseClick.bind(this)
  }
  name = "close";
  iconfont = "iconfont icon-close";
  title = "关闭";

  onEnter = (prams) => {
    this.onCloseClick()
  }
}