import Plugin from "react-img-editor/es/plugins/Plugin";

export default class Export extends Plugin {
  constructor(options) {
    super(options)
    this.onSaveClick = options.onSaveClick.bind(this)
  }
  name = "export";
  iconfont = "iconfont icon-check-outline";
  title = "保存批注";

  onEnter = drawEventParams => {
    const { drawLayer, pixelRatio ,historyStack } = drawEventParams;
    // 延迟下载，等触发 plugin 的 onLeave 生命周期，清除未完成的现场
    setTimeout(() => {
      if(historyStack.length > 0 ){
        const dataURL = drawLayer.toDataURL({ pixelRatio })
        this.onSaveClick(dataURL)
      }else{
        this.onSaveClick('')
      }
    }, 100);
  };
}