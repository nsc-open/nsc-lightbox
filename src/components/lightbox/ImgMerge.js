export default class ImgMerge {
  constructor({
    imgs = [], options
  }) {
    let defaultImgsItem = {
      url: '',
      x: 0,
      y: 0
    };
    // 导出图片的格式与压缩程度默认配置项
    let defaultOpts = {
      type: 'image/jpeg',
      compress: 1
    };

    try {
      imgs.forEach((item, i, arr) => {
        arr[i] = { ...defaultImgsItem, ...item }
      });
    } catch (e) {
      throw '请传入一个正确的对象数组作为参数';
    }

    this.imgs = imgs;   // 图片数组配置项
    this.opts = { ...defaultOpts, ...options };   // 其他配置项
    this.imgObjs = [];   // 图片对象数组
    this.ctx = null
    this.createCanvas();  // 创建画布
  }

  // 创建画布
  createCanvas = () => {

    let canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

    let w = this.imgs[0].width, h = this.imgs[0].height;

    if (!w) {
      throw '第一张图片宽度未设置';
    }
    if (!h) {
      throw '第一张图片高度未设置';
    }

    canvas.width = w;
    canvas.height = h;
    this.canvas = canvas
    this.ctx = ctx;

  }

  // 绘制图片
  drawImg = (i) => {

    let img = new Image();
    img.src = this.imgs[i].url;
    img.setAttribute("crossOrigin", 'Anonymous')
    this.imgObjs.push(img);
    return new Promise((resolve) => {
      img.onload = resolve;
    });

  }

  // 导出图片
  outputImg = () => {
    console.log('导出')
    let imgArr = [];
    // 将单张图片的Promise对象存入数组
    this.imgs.forEach((item, i) => {
      imgArr.push(this.drawImg(i));
    });
    // 所有图片加载成功后将图片绘制于Canvas中，后将Canvas导出为图片
    Promise.all(imgArr).then(() => {
      this.imgs.forEach((item, i) => {
        let drawPara = [this.imgObjs[i], this.imgs[i].x, this.imgs[i].y];
        // 此处判断参数中图片是否设置了宽高，若宽高均设置，则绘制已设置的宽高，否则按照图片默认宽高绘制
        if (this.imgs[i].width && this.imgs[i].height) {
          drawPara.push(this.imgs[i].width, this.imgs[i].height);
        }
        this.ctx.drawImage(...drawPara);
      });
      this.ctx.canvas.toBlob((blob) => {
        const link = document.createElement('a')
        link.download = ''
        link.href = URL.createObjectURL(blob)
        link.click()
      }, 'image/jpeg')
      this.canvas.toDataURL()
      // 以base64格式导出图片
    });

  }

}
