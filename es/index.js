import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { getCenter } from 'ol/extent';
import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection';
import ImageStatic from 'ol/source/ImageStatic';
import Spin from 'antd/lib/spin';
import Tooltip from 'antd/lib/tooltip';
import 'react-img-editor/assets/index.css';
import 'react-img-editor/assets/iconfont.css';
import message from 'antd/lib/message';
import Icon from 'antd/lib/icon';
import ReactImgEditor from 'react-img-editor';
import Plugin from 'react-img-editor/es/plugins/Plugin';
import { notification } from 'antd';
import Url from 'url-parse';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var getWindowSize = function getWindowSize() {
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return {
    width: width,
    height: height
  };
};

// coordinates directly to map coordinates, so we create a projection that uses
// the image extent in pixels.

var _getWindowSize = getWindowSize();

var ImageStaticMap = /*#__PURE__*/function (_Component) {
  _inherits(ImageStaticMap, _Component);

  var _super = _createSuper(ImageStaticMap);

  function ImageStaticMap(ctx) {
    var _this;

    _classCallCheck(this, ImageStaticMap);

    _this = _super.call(this, ctx);

    _defineProperty(_assertThisInitialized(_this), "imgObj", null);

    _defineProperty(_assertThisInitialized(_this), "map", null);

    _defineProperty(_assertThisInitialized(_this), "extent", null);

    _defineProperty(_assertThisInitialized(_this), "projection", null);

    _defineProperty(_assertThisInitialized(_this), "view", null);

    _defineProperty(_assertThisInitialized(_this), "imageLayer", null);

    _defineProperty(_assertThisInitialized(_this), "imageSource", new ImageStatic({}));

    _defineProperty(_assertThisInitialized(_this), "imageInfoSource", null);

    _defineProperty(_assertThisInitialized(_this), "imageInfoLayer", null);

    _defineProperty(_assertThisInitialized(_this), "initMap", function () {
      var map = new Map({
        target: _this.mountNode,
        controls: []
      });
      _this.map = map;
    });

    _defineProperty(_assertThisInitialized(_this), "getImageSize", function (_ref, callback) {
      var src = _ref.src,
          _ref$imageWidth = _ref.imageWidth,
          imageWidth = _ref$imageWidth === void 0 ? 0 : _ref$imageWidth,
          _ref$imageHeight = _ref.imageHeight,
          imageHeight = _ref$imageHeight === void 0 ? 0 : _ref$imageHeight;
      var getImageSize = _this.props.getImageSize;
      var width = imageWidth;
      var height = imageHeight;

      if (src && !(imageWidth || imageHeight)) {
        var img = new Image();
        img.src = src;

        img.onload = function () {
          width = img.width;
          height = img.height;
          getImageSize && getImageSize({
            width: width,
            height: height
          });
          callback({
            width: width,
            height: height
          });
        };
      } else {
        getImageSize && getImageSize({
          width: width,
          height: height
        });
        callback({
          width: width,
          height: height
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "addImage", function (callback) {
      _this.removeImage();

      var _this$props = _this.props,
          src = _this$props.src,
          imageWidth = _this$props.imageWidth,
          imageHeight = _this$props.imageHeight;

      _this.setState({
        spinning: true
      });

      _this.getImageSize({
        src: src,
        imageWidth: imageWidth,
        imageHeight: imageHeight
      }, function (_ref2) {
        var width = _ref2.width,
            height = _ref2.height;
        _this.extent = [0, 0, width, height];
        _this.projection = new Projection({
          code: "xkcd-image",
          units: "pixels",
          extent: _this.extent
        });
        _this.imageSource = new ImageStatic({
          url: src,
          projection: _this.projection,
          imageExtent: _this.extent
        });
        _this.imageLayer = new ImageLayer({
          source: _this.imageSource
        });
        _this.view = new View({
          projection: _this.projection,
          center: getCenter(_this.extent),
          zoom: 1,
          maxZoom: 5
        });

        _this.map.addLayer(_this.imageLayer);

        _this.map.setView(_this.view);

        _this.setState({
          spinning: false
        });

        callback && callback();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "removeImage", function () {
      if (_this.imageLayer) {
        _this.map.removeLayer(_this.imageLayer);

        _this.imageSource = null;
        _this.imageLayer = null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "addImageInfoLayer", function (src) {
      _this.removeImageInfoLayer();

      _this.imageInfoSource = new ImageStatic({
        url: src,
        projection: _this.projection,
        imageExtent: _this.extent
      });
      _this.imageInfoLayer = new ImageLayer({
        source: _this.imageInfoSource
      });

      _this.map.addLayer(_this.imageInfoLayer);
    });

    _defineProperty(_assertThisInitialized(_this), "removeImageInfoLayer", function () {
      if (_this.imageInfoLayer) {
        _this.map.removeLayer(_this.imageInfoLayer);

        _this.imageInfoSource = null;
        _this.imageInfoLayer = null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "changeImage", function (dataURL) {
      _this.addImage(function () {
        _this.addImageInfoLayer(dataURL);
      });
    });

    _this.state = {
      spinning: false
    };
    return _this;
  }

  _createClass(ImageStaticMap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props2 = this.props,
          dataURL = _this$props2.dataURL,
          showInfo = _this$props2.showInfo;
      this.initMap();
      this.addImage(function () {
        showInfo ? _this2.addImageInfoLayer(dataURL) : _this2.removeImageInfoLayer();
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props3 = this.props,
          dataURL = _this$props3.dataURL,
          imageWidth = _this$props3.imageWidth,
          imageHeight = _this$props3.imageHeight;

      if (prevProps.showInfo !== this.props.showInfo) {
        if (this.props.showInfo) {
          this.addImageInfoLayer(dataURL);
        } else {
          this.removeImageInfoLayer();
        }
      }

      if (prevProps.src !== this.props.src || prevProps.dataURL !== this.props.dataURL) {
        this.changeImage(this.props.dataURL, imageWidth, imageHeight);
      }

      this.view && this.view.animate({
        zoom: this.props.mapZoom,
        center: getCenter(this.extent),
        duration: 600
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var spinning = this.state.spinning;
      return /*#__PURE__*/React.createElement(React.Fragment, null, spinning ? /*#__PURE__*/React.createElement(Spin, {
        size: "large",
        style: {
          position: 'absolute',
          zIndex: 99999,
          left: '50%',
          top: '50%'
        }
      }) : null, /*#__PURE__*/React.createElement("div", {
        ref: function ref(m) {
          return _this3.mountNode = m;
        },
        className: "map",
        style: {
          width: '100%',
          height: '100%'
        }
      }));
    }
  }]);

  return ImageStaticMap;
}(Component);

ImageStaticMap.propTypes = {
  showInfo: PropTypes.bool
};
ImageStaticMap.defaultProps = {
  showInfo: true
};

var prefixCls = 'react-img-editor';
var defaultTools = [{
  name: 'zoomIn',
  iconfont: 'icon-zoomIn',
  title: '放大'
}, {
  name: 'zoomOut',
  iconfont: 'icon-zoomOut',
  title: '缩小'
}, {
  name: 'prev',
  iconfont: 'icon-prev',
  title: '上一项'
}, {
  name: 'next',
  iconfont: "icon-next",
  title: "\u4E0B\u4E00\u9879"
}, {
  name: 'close',
  iconfont: 'icon-close',
  title: '关闭'
}];

var LightboxToolbar = /*#__PURE__*/function (_Component) {
  _inherits(LightboxToolbar, _Component);

  var _super = _createSuper(LightboxToolbar);

  function LightboxToolbar() {
    _classCallCheck(this, LightboxToolbar);

    return _super.apply(this, arguments);
  }

  _createClass(LightboxToolbar, [{
    key: "handleClick",
    value: function handleClick(btnKey) {
      var propName = "on".concat(btnKey[0].toUpperCase()).concat(btnKey.substr(1), "Click"); // onApplyClick, onReturnClick, onAlarmClick

      this.props[propName] && this.props[propName](btnKey);
    }
  }, {
    key: "renderTool",
    value: function renderTool(tool) {
      var _this = this;

      var currentTool = this.props.currentTool;
      var isActivated = !!(currentTool && currentTool === tool.name);
      var isDisabled = tool.disable;
      var isHidden = tool.hidden;
      return /*#__PURE__*/React.createElement(Tooltip, {
        key: tool.name,
        title: tool.title,
        placement: "bottom",
        overlayClassName: "".concat(prefixCls, "-tooltip")
      }, /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-toolbar-icon ").concat(isActivated ? 'activated' : '', " ").concat(isDisabled ? 'disabled' : ''),
        style: {
          display: isHidden ? 'none' : 'block'
        }
      }, /*#__PURE__*/React.createElement("i", {
        title: tool.title,
        className: "iconfont ".concat(tool.iconfont),
        onClick: function onClick(_) {
          return !isDisabled && _this.handleClick(tool.name);
        }
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var tools = this.props.tools;
      return /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-toolbar"),
        style: {
          width: '100%'
        }
      }, tools.map(function (item) {
        return _this2.renderTool(item);
      }));
    }
  }]);

  return LightboxToolbar;
}(Component);

_defineProperty(LightboxToolbar, "defaultProps", {
  tools: defaultTools
});

LightboxToolbar.propTypes = {
  tools: PropTypes.array
};

var prefixCls$1 = 'lightbox-viewer';

var LightboxNav = /*#__PURE__*/function (_Component) {
  _inherits(LightboxNav, _Component);

  var _super = _createSuper(LightboxNav);

  function LightboxNav() {
    var _this;

    _classCallCheck(this, LightboxNav);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleChangeImg", function (newIndex) {
      if (_this.props.activeIndex === newIndex) {
        return;
      }

      _this.props.onChangeImg(newIndex);
    });

    return _this;
  }

  _createClass(LightboxNav, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$activeInd = this.props.activeIndex,
          activeIndex = _this$props$activeInd === void 0 ? 0 : _this$props$activeInd;
      var marginLeft = "calc(50% - ".concat(activeIndex + 1, " * 31px)");
      var listStyle = {
        marginLeft: marginLeft
      };
      return /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls$1, "-navbar")
      }, /*#__PURE__*/React.createElement("ul", {
        className: "".concat(prefixCls$1, "-list ").concat(prefixCls$1, "-list-transition"),
        style: listStyle
      }, this.props.images.map(function (item, index) {
        return /*#__PURE__*/React.createElement("li", {
          key: index,
          className: index === activeIndex ? 'active' : '',
          onClick: function onClick() {
            _this2.handleChangeImg(index);
          }
        }, /*#__PURE__*/React.createElement("img", {
          src: item.uri
        }));
      })));
    }
  }]);

  return LightboxNav;
}(Component);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".container {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  min-height: 400px;\n  text-align: center;\n}\n\n.iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: none;\n  width: 100%;\n  height: 100%;\n}\n\n.spinner {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n}\n";
styleInject(css);

/**
 * props.src
 * props.style
 */

var IFrame = /*#__PURE__*/function (_Component) {
  _inherits(IFrame, _Component);

  var _super = _createSuper(IFrame);

  function IFrame() {
    var _this;

    _classCallCheck(this, IFrame);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      loading: true
    });

    return _this;
  }

  _createClass(IFrame, [{
    key: "handleOnLoad",

    /* shouldComponentUpdate (nextProps, nextState) {
      if (nextState.loading !== this.state.loading) {
        return true
      } else {
        return nextProps.src !== this.props.src
      }
    } */
    value: function handleOnLoad() {
      this.setState({
        loading: false
      });
    }
  }, {
    key: "getIFrame",
    value: function getIFrame() {
      return this.refs.frame;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          src = _this$props.src,
          children = _this$props.children,
          style = _this$props.style;
      return /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement(Spin, {
        spinning: this.state.loading,
        className: "spinner"
      }), /*#__PURE__*/React.createElement("iframe", {
        ref: "frame",
        className: "iframe",
        style: _objectSpread2({}, style),
        src: src,
        onLoad: function onLoad() {
          return _this2.handleOnLoad();
        }
      }), !this.state.loading ? children : null);
    }
  }]);

  return IFrame;
}(Component);

IFrame.propTypes = {
  src: PropTypes.string.isRequired
};

var isImageFileType = function isImageFileType(type) {
  return !!type && type.indexOf('image') === 0;
};

var isImg = function isImg(file) {
  if (isImageFileType(file.fileType)) {
    return true;
  }

  var extension = file.fileExt ? file.fileExt : '';

  if (/(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)) {
    return true;
  }

  if (extension) {
    // other file types which have extension
    return false;
  }

  return true;
};

var isLink = function isLink(file) {
  var extension = file.fileExt ? file.fileExt : '';

  if (/(pdf|doc|docx|xls|xlsx|ppt)$/i.test(extension)) {
    return true;
  }

  if (extension) {
    // other file types which have extension
    return false;
  }

  return true;
};

var LightboxViewer = /*#__PURE__*/function (_Component) {
  _inherits(LightboxViewer, _Component);

  var _super = _createSuper(LightboxViewer);

  function LightboxViewer() {
    var _this;

    _classCallCheck(this, LightboxViewer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      mapZoom: 1,
      visibleMap: false,
      activeIndex: 0,
      imgH: 0,
      imgW: 0,
      visibleLink: false,
      showInfo: true
    });

    _defineProperty(_assertThisInitialized(_this), "onZoomInClick", function () {
      if (_this.map) {
        var currentZoom = _this.map.map.getView().getZoom();

        _this.setState({
          mapZoom: currentZoom + 0.5
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onZoomOutClick", function () {
      if (_this.map) {
        var currentZoom = _this.map.map.getView().getZoom();

        _this.setState({
          mapZoom: currentZoom - 0.5
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPrevClick", function () {
      var _this$props = _this.props,
          imgvImages = _this$props.imgvImages,
          imgvActiveImage = _this$props.imgvActiveImage,
          onChange = _this$props.onChange;
      var index = imgvImages.findIndex(function (i) {
        return i.uri === imgvActiveImage.uri;
      });
      index = index - 1;
      var prevImage = imgvImages[index];

      if (prevImage) {
        _this.setState({
          activeIndex: index,
          showInfo: true,
          visibleMap: isImg(prevImage),
          visibleLink: isLink(prevImage)
        });

        onChange && onChange(prevImage);
      } else {
        message.info('到头了', .5);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onNextClick", function () {
      var _this$props2 = _this.props,
          imgvImages = _this$props2.imgvImages,
          imgvActiveImage = _this$props2.imgvActiveImage,
          onChange = _this$props2.onChange;
      var index = imgvImages.findIndex(function (i) {
        return i.uri === imgvActiveImage.uri;
      });
      index = index + 1;
      var nextImage = imgvImages[index];

      if (nextImage) {
        _this.setState({
          activeIndex: index,
          showInfo: true,
          visibleMap: isImg(nextImage),
          visibleLink: isLink(nextImage)
        });

        onChange && onChange(nextImage);
      } else {
        message.info('到尾了', .5);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onShowInfoClick", function () {
      var showInfo = _this.state.showInfo;

      _this.setState({
        showInfo: !showInfo
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeImg", function (newIndex) {
      var _this$props3 = _this.props,
          imgvImages = _this$props3.imgvImages,
          onChange = _this$props3.onChange;
      var newImage = imgvImages[newIndex];

      _this.setState({
        activeIndex: newIndex,
        showInfo: true,
        visibleLink: isLink(newImage),
        visibleMap: isImg(newImage)
      });

      onChange && onChange(newImage);
    });

    _defineProperty(_assertThisInitialized(_this), "getImageSize", function (_ref) {
      var width = _ref.width,
          height = _ref.height;
      console.log('width', width, height);

      _this.setState({
        imgW: width,
        imgH: height
      });
    });

    return _this;
  }

  _createClass(LightboxViewer, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props4 = this.props,
          imgvActiveImage = _this$props4.imgvActiveImage,
          activeIndex = _this$props4.activeIndex;

      if (imgvActiveImage) {
        var obj = {
          visibleMap: isImg(imgvActiveImage),
          visibleLink: isLink(imgvActiveImage),
          activeIndex: activeIndex
        };
        this.setState(obj);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props5 = this.props,
          imgvImages = _this$props5.imgvImages,
          imgvActiveImage = _this$props5.imgvActiveImage,
          onDeleteInfoClick = _this$props5.onDeleteInfoClick,
          onSaveClick = _this$props5.onSaveClick,
          onDownloadClick = _this$props5.onDownloadClick,
          onAddInfoClick = _this$props5.onAddInfoClick,
          onCloseClick = _this$props5.onCloseClick,
          displayTools = _this$props5.displayTools,
          customTools = _this$props5.customTools,
          showAttribute = _this$props5.showAttribute,
          showNav = _this$props5.showNav,
          showToolbar = _this$props5.showToolbar;
      var _this$state = this.state,
          mapZoom = _this$state.mapZoom,
          activeIndex = _this$state.activeIndex,
          imgH = _this$state.imgH,
          imgW = _this$state.imgW,
          visibleLink = _this$state.visibleLink,
          visibleMap = _this$state.visibleMap,
          showInfo = _this$state.showInfo;
      var uri = imgvActiveImage ? imgvActiveImage.uri : '';
      var base64DataURL = imgvActiveImage ? imgvActiveImage.base64DataURL : '';
      var tools = customTools ? customTools : [{
        name: 'zoomIn',
        iconfont: 'icon-zoomIn',
        title: '放大'
      }, {
        name: 'zoomOut',
        iconfont: 'icon-zoomOut',
        title: '缩小'
      }, {
        name: 'addInfo',
        iconfont: 'icon-formOutline',
        title: '添加批注'
      }, {
        name: 'deleteInfo',
        iconfont: 'icon-deleteInfo',
        title: '删除批注',
        hidden: base64DataURL ? false : true
      }, {
        name: 'showInfo',
        iconfont: "".concat(showInfo ? 'icon-showInfo' : 'icon-hideInfo'),
        title: "".concat(showInfo ? '隐藏' : '查看', "\u6279\u6CE8"),
        disable: base64DataURL ? false : true
      }, {
        name: 'prev',
        iconfont: 'icon-prev',
        title: '上一项'
      }, {
        name: 'next',
        iconfont: "icon-next",
        title: "\u4E0B\u4E00\u9879"
      }, {
        name: 'save',
        iconfont: "icon-save",
        title: "\u4FDD\u5B58"
      }, {
        name: 'download',
        iconfont: "icon-download",
        title: "\u4E0B\u8F7D"
      }, {
        name: 'close',
        iconfont: 'icon-close',
        title: '关闭'
      }].filter(function (tool) {
        if (displayTools[0] === '*') {
          return true;
        } else {
          return displayTools.includes(tool.name);
        }
      });
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "lightbox-viewer-content",
        style: {
          zIndex: 1015
        }
      }, visibleMap && /*#__PURE__*/React.createElement(ImageStaticMap, {
        ref: function ref(_ref2) {
          return _this2.map = _ref2;
        },
        mapZoom: mapZoom,
        src: uri,
        dataURL: base64DataURL,
        getImageSize: this.getImageSize,
        showInfo: showInfo
      }), visibleLink && /*#__PURE__*/React.createElement(IFrame, {
        src: uri
      }), !visibleMap && !visibleLink && /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#fff',
          minHeight: '500px',
          fontSize: '16px',
          lineHeight: '40px',
          margin: '0 auto',
          textAlign: 'center',
          paddingTop: '30px'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        type: "exclamation-circle",
        style: {
          fontSize: '35px'
        }
      }), /*#__PURE__*/React.createElement("div", null, "\u8BE5\u6587\u4EF6\u4E0D\u652F\u6301\u9884\u89C8"))), visibleMap && showToolbar && /*#__PURE__*/React.createElement("p", {
        className: "lightbox-viewer-attribute"
      }, /*#__PURE__*/React.createElement("span", {
        className: "lightbox-viewer-img-details"
      }, "(".concat(imgW, " x ").concat(imgH, ")")), /*#__PURE__*/React.createElement("span", {
        className: "lightbox-viewer-showTotal"
      }, "".concat(activeIndex + 1, " of ").concat(imgvImages.length))), showToolbar && /*#__PURE__*/React.createElement("div", {
        className: "lightbox-viewer-toolbar"
      }, /*#__PURE__*/React.createElement(LightboxToolbar, {
        tools: tools,
        onZoomInClick: this.onZoomInClick,
        onZoomOutClick: this.onZoomOutClick,
        onPrevClick: this.onPrevClick,
        onNextClick: this.onNextClick,
        onShowInfoClick: this.onShowInfoClick,
        onDeleteInfoClick: onDeleteInfoClick,
        onAddInfoClick: onAddInfoClick,
        onSaveClick: onSaveClick,
        onDownloadClick: onDownloadClick,
        onCloseClick: onCloseClick
      })), showNav && /*#__PURE__*/React.createElement(LightboxNav, {
        images: imgvImages,
        activeIndex: activeIndex,
        onChangeImg: this.handleChangeImg
      }));
    }
  }]);

  return LightboxViewer;
}(Component);

LightboxViewer.propTypes = {
  visible: PropTypes.bool,
  imgvImages: PropTypes.array,
  onCancel: PropTypes.func
};
LightboxViewer.defaultProps = {
  visible: false,
  imgvImages: []
};

var Export = /*#__PURE__*/function (_Plugin) {
  _inherits(Export, _Plugin);

  var _super = _createSuper(Export);

  function Export(options) {
    var _this;

    _classCallCheck(this, Export);

    _this = _super.call(this, options);

    _defineProperty(_assertThisInitialized(_this), "name", "export");

    _defineProperty(_assertThisInitialized(_this), "iconfont", "iconfont icon-check-outline");

    _defineProperty(_assertThisInitialized(_this), "title", "保存批注");

    _defineProperty(_assertThisInitialized(_this), "onEnter", function (drawEventParams) {
      var drawLayer = drawEventParams.drawLayer,
          pixelRatio = drawEventParams.pixelRatio,
          historyStack = drawEventParams.historyStack; // 延迟下载，等触发 plugin 的 onLeave 生命周期，清除未完成的现场

      setTimeout(function () {
        if (historyStack.length > 0) {
          var dataURL = drawLayer.toDataURL({
            pixelRatio: pixelRatio
          });

          _this.onSaveClick(dataURL);
        } else {
          _this.onSaveClick('');
        }
      }, 100);
    });

    _this.onSaveClick = options.onSaveClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  return Export;
}(Plugin);

var Close = /*#__PURE__*/function (_Plugin) {
  _inherits(Close, _Plugin);

  var _super = _createSuper(Close);

  function Close(options) {
    var _this;

    _classCallCheck(this, Close);

    _this = _super.call(this, options);

    _defineProperty(_assertThisInitialized(_this), "name", "close");

    _defineProperty(_assertThisInitialized(_this), "iconfont", "iconfont icon-close");

    _defineProperty(_assertThisInitialized(_this), "title", "关闭");

    _defineProperty(_assertThisInitialized(_this), "onEnter", function (prams) {
      _this.onCloseClick();
    });

    _this.onCloseClick = options.onCloseClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  return Close;
}(Plugin);

var style = {
  display: 'flex',
  justifyContent: 'center',
  zIndex: 1015
};

var Drawbox = /*#__PURE__*/function (_Component) {
  _inherits(Drawbox, _Component);

  var _super = _createSuper(Drawbox);

  function Drawbox() {
    var _this;

    _classCallCheck(this, Drawbox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "setStage", function (stage) {});

    return _this;
  }

  _createClass(Drawbox, [{
    key: "render",
    value: function render() {
      var _getWindowSize = getWindowSize(),
          width = _getWindowSize.width,
          height = _getWindowSize.height;

      var _this$props = this.props,
          src = _this$props.src,
          onCloseClick = _this$props.onCloseClick,
          visible = _this$props.visible,
          onSaveClick = _this$props.onSaveClick;
      return /*#__PURE__*/React.createElement("div", {
        style: style,
        className: "react-img-editor-mask"
      }, /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(ReactImgEditor, {
        src: src,
        getStage: this.setStage,
        plugins: [new Export({
          onSaveClick: onSaveClick
        }), new Close({
          onCloseClick: onCloseClick
        })],
        width: width / 2,
        height: height - 40,
        toolbar: {
          items: ["pen", "text", "|", "repeal", "export", 'close']
        },
        crossOrigin: 'anonymous'
      })));
    }
  }]);

  return Drawbox;
}(Component);

var downloadFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(uri, filename, onProgress) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            xhrDownload(uri, function (progress) {
              notification.open({
                key: uri,
                message: "下载",
                duration: 0,
                description: "\u6B63\u5728\u4E0B\u8F7D[".concat(filename, "]\uFF1A").concat(Math.round(progress * 100), "%"),
                placement: "bottomRight"
              });
            }, function (blob) {
              var a = document.createElement("a");
              var url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = filename;
              a.click();
              window.URL.revokeObjectURL(url); // onComplete()

              notification.close(uri);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function downloadFile(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var xhrDownload = function xhrDownload(url) {
  var onProgress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var onComplete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "blob";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.responseType = type;
  xmlhttp.setRequestHeader("Cache-Control", "no-cache");

  xmlhttp.onprogress = function (event) {
    return onProgress(event.loaded / event.total);
  };

  xmlhttp.onload = function () {
    return onComplete(xmlhttp.response);
  };

  xmlhttp.send();
};

var ImgMerge = function ImgMerge(_ref) {
  var _this = this;

  var _ref$imgs = _ref.imgs,
      imgs = _ref$imgs === void 0 ? [] : _ref$imgs,
      options = _ref.options;

  _classCallCheck(this, ImgMerge);

  _defineProperty(this, "createCanvas", function () {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    var w = _this.imgs[0].width,
        h = _this.imgs[0].height;

    if (!w) {
      throw '第一张图片宽度未设置';
    }

    if (!h) {
      throw '第一张图片高度未设置';
    }

    canvas.width = w;
    canvas.height = h;
    _this.canvas = canvas;
    _this.ctx = ctx;
  });

  _defineProperty(this, "drawImg", function (i) {
    var img = new Image();
    img.src = _this.imgs[i].url;
    img.setAttribute("crossOrigin", 'Anonymous');

    _this.imgObjs.push(img);

    return new Promise(function (resolve) {
      img.onload = resolve;
    });
  });

  _defineProperty(this, "outputImg", function () {
    console.log('导出');
    var imgArr = []; // 将单张图片的Promise对象存入数组

    _this.imgs.forEach(function (item, i) {
      imgArr.push(_this.drawImg(i));
    }); // 所有图片加载成功后将图片绘制于Canvas中，后将Canvas导出为图片


    Promise.all(imgArr).then(function () {
      _this.imgs.forEach(function (item, i) {
        var _this$ctx;

        var drawPara = [_this.imgObjs[i], _this.imgs[i].x, _this.imgs[i].y]; // 此处判断参数中图片是否设置了宽高，若宽高均设置，则绘制已设置的宽高，否则按照图片默认宽高绘制

        if (_this.imgs[i].width && _this.imgs[i].height) {
          drawPara.push(_this.imgs[i].width, _this.imgs[i].height);
        }

        (_this$ctx = _this.ctx).drawImage.apply(_this$ctx, drawPara);
      });

      _this.ctx.canvas.toBlob(function (blob) {
        var link = document.createElement('a');
        link.download = '';
        link.href = URL.createObjectURL(blob);
        link.click();
      }, 'image/jpeg');

      _this.canvas.toDataURL(); // 以base64格式导出图片

    });
  });

  var defaultImgsItem = {
    url: '',
    x: 0,
    y: 0
  }; // 导出图片的格式与压缩程度默认配置项

  var defaultOpts = {
    type: 'image/jpeg',
    compress: 1
  };

  try {
    imgs.forEach(function (item, i, arr) {
      arr[i] = _objectSpread2(_objectSpread2({}, defaultImgsItem), item);
    });
  } catch (e) {
    throw '请传入一个正确的对象数组作为参数';
  }

  this.imgs = imgs; // 图片数组配置项

  this.opts = _objectSpread2(_objectSpread2({}, defaultOpts), options); // 其他配置项

  this.imgObjs = []; // 图片对象数组

  this.ctx = null;
  this.createCanvas(); // 创建画布
} // 创建画布
;

var css$1 = "@font-face {font-family: \"iconfont\";\r\n  src: url('./iconfont.eot?t=1588222313480'); /* IE9 */\r\n  src: url('./iconfont.eot?t=1588222313480#iefix') format('embedded-opentype'), /* IE6-IE8 */\r\n  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),\r\n  url('./iconfont.woff?t=1588222313480') format('woff'),\r\n  url('./iconfont.ttf?t=1588222313480') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */\r\n  url('./iconfont.svg?t=1588222313480#iconfont') format('svg'); /* iOS 4.1- */\r\n}\r\n\r\n.iconfont {\r\n  font-family: \"iconfont\" !important;\r\n  font-size: 16px;\r\n  font-style: normal;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n.icon-map:before {\r\n  content: \"\\e60b\";\r\n}\r\n\r\n.icon-delete:before {\r\n  content: \"\\e610\";\r\n}\r\n\r\n.icon-delete1:before {\r\n  content: \"\\e604\";\r\n}\r\n\r\n.icon-icon-delete:before {\r\n  content: \"\\e605\";\r\n}\r\n\r\n.icon-delete-info:before {\r\n  content: \"\\e61a\";\r\n}\r\n\r\n.icon-check-outline:before {\r\n  content: \"\\f25d\";\r\n}\r\n\r\n.icon-formOutline:before {\r\n  content: \"\\f2b7\";\r\n}\r\n\r\n.icon-save:before {\r\n  content: \"\\e741\";\r\n}\r\n\r\n.icon-check_outline:before {\r\n  content: \"\\e600\";\r\n}\r\n\r\n.icon-save1:before {\r\n  content: \"\\e761\";\r\n}\r\n\r\n.icon-prev:before {\r\n  content: \"\\e900\";\r\n}\r\n\r\n.icon-next:before {\r\n  content: \"\\e603\";\r\n}\r\n\r\n.icon-shuaxin:before {\r\n  content: \"\\e615\";\r\n}\r\n\r\n.icon-shunshizhen:before {\r\n  content: \"\\e69b\";\r\n}\r\n\r\n.icon-nishizhen:before {\r\n  content: \"\\e69c\";\r\n}\r\n\r\n.icon-save:before {\r\n  content: \"\\e70e\";\r\n}\r\n\r\n.icon-close:before {\r\n  content: \"\\e653\";\r\n}\r\n\r\n.icon-zoomIn:before {\r\n  content: \"\\e62c\";\r\n}\r\n\r\n.icon-zoomOut:before {\r\n  content: \"\\e6b5\";\r\n}\r\n\r\n.icon-gengduo:before {\r\n  content: \"\\e602\";\r\n}\r\n\r\n.icon-xuanzhong:before {\r\n  content: \"\\e60a\";\r\n}\r\n\r\n.icon-hideInfo:before {\r\n  content: \"\\e777\";\r\n}\r\n\r\n\r\n.icon-showInfo:before {\r\n  content: \"\\e77c\";\r\n}\r\n\r\n";
styleInject(css$1);

var css$2 = ".nsc-upload-picture-card-wrapper{\r\n    display: flex;\r\n    width: 100%;\r\n    z-index: 1;\r\n}\r\n\r\n.nsc-upload-container .ant-upload.ant-upload-drag{\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.nsc-uploader-dragger-hide{\r\n    display: none;\r\n}\r\n\r\n.nsc-uploader-dragger-show{\r\n    display: flex;\r\n}\r\n\r\n.nsc-uploader-radio{\r\n    margin: 15px 0px;\r\n}\r\n.nsc-uploader-radio-right{\r\n    text-align: right;\r\n    margin: 15px 0px;\r\n}\r\n.nsc-uploader-radio-left{\r\n    text-align: left;\r\n    margin: 15px 0px;\r\n}\r\n.nsc-uploader-radio-center{\r\n    text-align: center;\r\n    margin: 15px 0px;\r\n}\r\n\r\n.lightbox-viewer-transition{\r\n    transition: opacity 0.3s ease-out;\r\n  }\r\n  .lightbox-viewer-mask{\r\n    position: fixed;\r\n    top: 0;\r\n    right: 0;\r\n    left: 0;\r\n    bottom: 0;\r\n    background-color: #373737;\r\n    background-color: rgba(55, 55, 55, 0.6);\r\n    height: 100%;\r\n    filter: alpha(opacity=50);\r\n    z-index: 1000;\r\n  }\r\n  \r\n  .lightbox-viewer-close{\r\n    position: fixed;\r\n    top: 0px;\r\n    right: 0px;\r\n    overflow: hidden;\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 0 0 0 40px;\r\n    cursor: pointer;\r\n    z-index: 1010;\r\n  }\r\n  .lightbox-viewer-btn{\r\n    background-color: rgba(0, 0, 0, 0.5);\r\n    color: white;\r\n  }\r\n  \r\n  .lightbox-viewer-close > i{\r\n    position: relative;\r\n    top: 4px;\r\n    left: 18px;\r\n  }\r\n  .lightbox-viewer-icon{\r\n    font-family: 'icomoon' !important;\r\n    display: inline-block;\r\n    font-style: normal;\r\n    vertical-align: baseline;\r\n    text-align: center;\r\n    text-transform: none;\r\n    text-rendering: auto;\r\n    line-height: 1;\r\n    text-rendering: optimizeLegibility;\r\n    -webkit-font-smoothing: antialiased;\r\n    -moz-osx-font-smoothing: grayscale;\r\n    color: white;\r\n    font-size: 13px;\r\n  }\r\n  \r\n  .lightbox-viewer-content{\r\n    position: fixed;\r\n    top: 0;\r\n    right: 0;\r\n    left: 0;\r\n    bottom: 0;\r\n    overflow: hidden;\r\n    z-index: 1005;\r\n  }\r\n  \r\n  .lightbox-viewer-toolbar{\r\n    position: fixed;\r\n    bottom: 60px;\r\n    left: 25%;\r\n    right: 25%;\r\n    overflow: hidden;\r\n    text-align: center;\r\n    z-index:9999;\r\n  }\r\n  \r\n  .lightbox-viewer-toolbar .ant-btn{\r\n    margin: 0 20px;\r\n  }\r\n  \r\n  .lightbox-viewer-attribute{\r\n    position: fixed;\r\n    bottom: 102px;\r\n    left: 0;\r\n    right: 0;\r\n    overflow: hidden;\r\n    text-align: center;\r\n    z-index: 9999;\r\n    margin: 0px 20px;\r\n    margin-bottom: 0px;\r\n    opacity: 0.8;\r\n    color: #ccc;\r\n    font-size: 15px;\r\n  }\r\n  .lightbox-viewer-showTotal{\r\n    float: right;\r\n  }\r\n  \r\n  .lightbox-viewer-navbar{\r\n    overflow: hidden;\r\n    background-color: rgba(0, 0, 0, 0.5);\r\n    position: fixed;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n    text-align: center;\r\n    z-index: 9999;\r\n  }\r\n  \r\n  .lightbox-viewer-navbar ul{\r\n    margin: 5px;\r\n    padding: 0;\r\n  }\r\n  \r\n  .lightbox-viewer-list-transition {\r\n    -webkit-transition: margin 0.3s ease-out;\r\n    -o-transition: margin 0.3s ease-out;\r\n    transition: margin 0.3s ease-out;\r\n  }\r\n  \r\n  .lightbox-viewer-list > li {\r\n    display: inline-block;\r\n    width: 30px;\r\n    height: 50px;\r\n    cursor: pointer;\r\n    overflow: hidden;\r\n    margin-right: 1px;\r\n    list-style: none;\r\n  }\r\n  \r\n  \r\n  .lightbox-viewer-list {\r\n    height: 50px;\r\n    padding: 1px;\r\n    text-align: left;\r\n  }\r\n  \r\n  .lightbox-viewer-list > li.active > img {\r\n    opacity: 1;\r\n  }\r\n  .lightbox-viewer-list > li > img {\r\n    width: 60px;\r\n    height: 50px;\r\n    margin-left: -15px;\r\n    opacity: 0.5;\r\n  }\r\n  .lightbox-viewer-list > li.active > img {\r\n    opacity: 1;\r\n  }\r\n  \r\n  .react-img-editor-mask {\r\n    position: fixed;\r\n    top: 10px;\r\n    left: 50%;\r\n    right: 50%;\r\n    bottom: 0;\r\n    height: 100%;\r\n    z-index: 1015;\r\n  }\r\n  \r\n  .react-img-editor-palette{\r\n    background-image: none;\r\n    width: 100% !important;\r\n    margin-bottom: 10px;\r\n  }\r\n\r\n  .react-img-editor-toolbar-icon i{\r\n    font-size: 20px;\r\n    cursor: pointer;\r\n    padding: 8px;\r\n    background: rgba(55, 55, 55, 0.9);\r\n    border-radius: 10px;\r\n  }";
styleInject(css$2);

var isImageFileType$1 = function isImageFileType(type) {
  return !!type && type.indexOf('image') === 0;
};

var isImg$1 = function isImg(file) {
  if (isImageFileType$1(file.fileType)) {
    return true;
  }

  var extension = file.fileExt ? file.fileExt : '';

  if (/(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)) {
    return true;
  }

  if (extension) {
    // other file types which have extension
    return false;
  }

  return true;
};

var Lightbox = /*#__PURE__*/function (_Component) {
  _inherits(Lightbox, _Component);

  var _super = _createSuper(Lightbox);

  function Lightbox() {
    var _this;

    _classCallCheck(this, Lightbox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      imgvActiveImage: null,
      drawboxVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (imgvActiveImage) {
      _this.setState({
        imgvActiveImage: imgvActiveImage
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAddInfoClick", function () {
      _this.setState({
        drawboxVisible: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDeleteInfoClick", function () {
      _this.onDeleteClick();
    });

    _defineProperty(_assertThisInitialized(_this), "hideDrawViewerHandler", function () {
      _this.setState({
        drawboxVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSaveClick", function () {
      var onSaveInfo = _this.props.onSaveInfo;
      var imgvActiveImage = _this.state.imgvActiveImage;
      onSaveInfo && onSaveInfo(imgvActiveImage);
    });

    _defineProperty(_assertThisInitialized(_this), "onSaveAddInfoClick", function (dataURL) {
      var imgvActiveImage = _this.state.imgvActiveImage;

      _this.setState({
        imgvActiveImage: _objectSpread2(_objectSpread2({}, imgvActiveImage), {}, {
          base64DataURL: dataURL
        })
      });

      _this.onCancelDrawClick();
    });

    _defineProperty(_assertThisInitialized(_this), "onDeleteClick", function () {
      var imgvActiveImage = _this.state.imgvActiveImage;

      _this.setState({
        imgvActiveImage: _objectSpread2(_objectSpread2({}, imgvActiveImage), {}, {
          base64DataURL: ''
        })
      });

      if (_this.props.onDeleteInfoClick) {
        _this.props.onDeleteInfoClick(imgvActiveImage);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onCloseClick", function () {
      var drawboxVisible = _this.state.drawboxVisible;

      if (drawboxVisible) {
        _this.setState({
          drawboxVisible: false
        });
      } else {
        var onCancel = _this.props.onCancel;
        onCancel && onCancel();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDownloadClick", function () {
      var imgvActiveImage = _this.state.imgvActiveImage;
      var fileName = imgvActiveImage.fileName,
          uri = imgvActiveImage.uri,
          base64DataURL = imgvActiveImage.base64DataURL,
          width = imgvActiveImage.width,
          height = imgvActiveImage.height;

      if (isImg$1(imgvActiveImage) && base64DataURL) {
        var parsed = new Url(uri, null, true);
        parsed.query.time = new Date().valueOf();
        var url = parsed.toString();
        console.log(url);
        var imgs = [{
          url: url,
          width: width,
          height: height
        }, {
          url: base64DataURL,
          width: width,
          height: height
        }];
        var imgMerge = new ImgMerge({
          imgs: imgs
        });
        imgMerge.outputImg();
      } else {
        downloadFile(uri, fileName);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onCancelDrawClick", function () {
      _this.setState({
        drawboxVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setImageSize", function (width, height) {
      _this.setState({
        imgvActiveImage: _objectSpread2(_objectSpread2({}, _this.state.imgvActiveImage), {}, {
          width: width,
          height: height
        })
      });
    });

    return _this;
  }

  _createClass(Lightbox, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var imgvImages = this.props.imgvImages;

      if (imgvImages.length > 0) {
        var imgvActiveImage = 'activeIndex' in this.props ? imgvImages[this.props.activeIndex] : imgvImages[0];
        this.setState({
          imgvActiveImage: imgvActiveImage
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var imgvImages = this.props.imgvImages;

      if (imgvImages !== prevProps.imgvImages) {
        var imgvActiveImage = 'activeIndex' in this.props ? imgvImages[this.props.activeIndex] : imgvImages[0];
        this.setState({
          imgvActiveImage: imgvActiveImage
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          imgvImages = _this$props.imgvImages,
          visible = _this$props.visible,
          withDrawer = _this$props.withDrawer,
          customTools = _this$props.customTools,
          activeIndex = _this$props.activeIndex,
          showAttribute = _this$props.showAttribute,
          showNav = _this$props.showNav,
          showToolbar = _this$props.showToolbar;
      var _this$state = this.state,
          imgvActiveImage = _this$state.imgvActiveImage,
          drawboxVisible = _this$state.drawboxVisible;
      var uri = imgvActiveImage.uri,
          base64DataURL = imgvActiveImage.base64DataURL;
      var parsed = new Url(uri, null, true);
      parsed.query.time = new Date().valueOf();
      var url = parsed.toString();
      console.log(url);
      var showStyle = {
        'opacity': 1,
        'display': 'block'
      };
      var hiddenStyle = {
        'display': 'none'
      };
      var displayTools = withDrawer || customTools ? ['*'] : 'displayTools' in this.props ? this.props.displayTools : ['addInfo', 'showInfo', 'deleteInfo', 'zoomIn', 'zoomOut', 'prev', 'next', 'download', 'close'];
      return /*#__PURE__*/React.createElement("div", {
        className: "lightbox-viewer lightbox-viewer-transition",
        style: visible ? showStyle : hiddenStyle
      }, /*#__PURE__*/React.createElement("div", {
        className: "lightbox-viewer-mask",
        onClick: this.onCloseClick
      }), !drawboxVisible && imgvActiveImage ? /*#__PURE__*/React.createElement(LightboxViewer, {
        imgvImages: imgvImages,
        imgvActiveImage: imgvActiveImage,
        activeIndex: activeIndex,
        onChange: this.onChange,
        customTools: customTools,
        displayTools: displayTools,
        onDeleteInfoClick: this.onDeleteInfoClick,
        onAddInfoClick: this.onAddInfoClick,
        setImageSize: this.setImageSize,
        onDownloadClick: this.onDownloadClick,
        onCloseClick: this.onCloseClick,
        onSaveClick: this.onSaveClick,
        showToolbar: showToolbar,
        showNav: showNav,
        showAttribute: showAttribute
      }) : /*#__PURE__*/React.createElement(Drawbox, {
        src: url,
        onCloseClick: this.onCancelDrawClick,
        onSaveClick: this.onSaveAddInfoClick,
        dataURL: base64DataURL
      }));
    }
  }]);

  return Lightbox;
}(Component);

Lightbox.propTypes = {
  visible: PropTypes.bool,
  withDrawer: PropTypes.bool,
  imgvImages: PropTypes.array,
  onCancel: PropTypes.func
};
Lightbox.defaultProps = {
  visible: false,
  imgvImages: [],
  withDrawer: false,
  showToolbar: true,
  showAttribute: true,
  showNav: true
};

var index = {
  Lightbox: Lightbox
};

export default index;
export { Lightbox };
