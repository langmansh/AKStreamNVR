'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var numeral = _interopDefault(require('numeral'));
var antd = require('antd');
require('antd/lib/tooltip/style/index.css');
require('antd/lib/slider/style/index.css');
require('antd/lib/dropdown/style/index.css');
var Hls = _interopDefault(require('hls.js'));
var flvjs = _interopDefault(require('flv.js'));
var ReactSWF = _interopDefault(require('react-swf'));

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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var ReactPlayerContext = React.createContext([{}, function () {}]);

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

var css = ".index-module_slider__2WQEs,\n.index-module_slidingSlider__KDq1- {\n  position: relative;\n  height: 20px;\n  cursor: pointer;\n}\n.index-module_sliderRail__lv7nE {\n  position: absolute;\n  left: 0;\n  top: 8px;\n  width: 100%;\n  height: 4px;\n  background-color: rgba(255, 255, 255, 0.2);\n  transition: background-color 0.3s;\n  overflow: hidden;\n}\n.index-module_sliderBuffered__KUfWa {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.5);\n  transition: background-color 0.3s;\n  transform: translate(-100%, 0);\n}\n.index-module_sliderTrack__3tJaF {\n  position: absolute;\n  background: #ff0000;\n  transition: background-color 0.3s ease;\n  width: 100%;\n  height: 100%;\n  transform: translate(-100%, 0);\n}\n.index-module_sliderHandleRail__2RElC {\n  position: absolute;\n  left: 0;\n  top: 4px;\n  width: 100%;\n  height: 12px;\n  transform: translate(-100%, 0);\n}\n.index-module_sliderHandle__3llMc {\n  position: absolute;\n  top: 0;\n  right: -6px;\n  width: 12px;\n  height: 12px;\n  cursor: pointer;\n  border-radius: 50%;\n  box-shadow: 0;\n  visibility: hidden;\n  background: #ff0000;\n  border: none 0 transparent;\n  outline: none;\n}\n.index-module_sliderHandle__3llMc:focus {\n  box-shadow: 0 0 0 5px rgba(255, 0, 0, 0.2);\n}\n.index-module_slidingSlider__KDq1- .index-module_sliderHandle__3llMc {\n  visibility: visible;\n}\n.index-module_slider__2WQEs:hover .index-module_sliderHandle__3llMc {\n  visibility: visible;\n}\n.index-module_tooltip__iCF9x {\n  position: absolute;\n  bottom: 120%;\n  left: 0;\n  width: 100%;\n}\n.index-module_tooltip__iCF9x .index-module_tip__1w8xo {\n  display: inline-block;\n  padding: 0.4em 0.8em;\n  border-radius: 4px;\n  background: #333;\n  color: #fff;\n  transform: translateX(-50%);\n}\n.index-module_tooltip__iCF9x .index-module_tip__1w8xo:after {\n  content: '';\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px;\n  border-style: solid;\n  border-color: #333 transparent transparent transparent;\n}\n";
var styles = {"slider":"index-module_slider__2WQEs","slidingSlider":"index-module_slidingSlider__KDq1-","sliderRail":"index-module_sliderRail__lv7nE","sliderBuffered":"index-module_sliderBuffered__KUfWa","sliderTrack":"index-module_sliderTrack__3tJaF","sliderHandleRail":"index-module_sliderHandleRail__2RElC","sliderHandle":"index-module_sliderHandle__3llMc","tooltip":"index-module_tooltip__iCF9x","tip":"index-module_tip__1w8xo"};
styleInject(css);

var getBufferedEnd = function getBufferedEnd(currentTime, buffered) {
  if (!buffered) {
    return 0;
  }

  for (var i = buffered.length - 1; 0 <= i; i -= 1) {
    var end = buffered.end(i);

    if (currentTime <= end && buffered.start(i) <= currentTime) {
      return end;
    }
  }

  return 0;
};

var getValue = function getValue(e, rect, duration) {
  var w = e.clientX - rect.left;

  if (0 >= w) {
    return 0;
  }

  if (w >= rect.width) {
    return duration;
  }

  return Math.round(duration * (e.clientX - rect.left) / rect.width);
};

var getBufferedTranslateX = function getBufferedTranslateX(_ref) {
  var buffered = _ref.buffered,
      currentTime = _ref.currentTime,
      sliding = _ref.sliding,
      duration = _ref.duration;

  if (0 >= duration || sliding) {
    return '-100%';
  }

  var e = getBufferedEnd(currentTime, buffered);
  return "".concat((100 * e / duration - 100).toFixed(1), "%");
};

var getTrackTranslateX = function getTrackTranslateX(_ref2) {
  var duration = _ref2.duration,
      currentTime = _ref2.currentTime,
      value = _ref2.value,
      sliding = _ref2.sliding;

  if (0 > duration) {
    return '0';
  }

  if (0 === duration) {
    return '-100%';
  }

  return "".concat((100 * (sliding ? value : currentTime) / duration - 100).toFixed(1), "%");
};

var getMouseTranslateX = function getMouseTranslateX(_ref3) {
  var duration = _ref3.duration,
      tooltip = _ref3.tooltip;

  if (0 >= duration) {
    return '0';
  }

  return "".concat((100 * tooltip / duration).toFixed(1), "%");
};

var Slider = React.memo(function (_ref4) {
  var currentTime = _ref4.currentTime,
      duration = _ref4.duration,
      buffered = _ref4.buffered,
      onChange = _ref4.onChange;

  var _React$useState = React.useState(currentTime),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      sliding = _React$useState4[0],
      setSliding = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      visible = _React$useState6[0],
      setVisible = _React$useState6[1];

  var _React$useState7 = React.useState(0),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      tooltip = _React$useState8[0],
      setTooltip = _React$useState8[1];

  var sliderRef = React.useRef(null);
  var onClick = React.useCallback(function (e) {
    e.preventDefault();
    var rect = e.currentTarget.getBoundingClientRect();
    var v = getValue(e, rect, duration);
    onChange(v);
    setSliding(false);
  }, [onChange, duration]);
  var onMouseUp = React.useCallback(function (e) {
    e.preventDefault();

    if (sliderRef && sliderRef.current) {
      var rect = sliderRef.current.getBoundingClientRect();
      var v = getValue(e, rect, duration);
      onChange(v);
      setSliding(false);
    }
  }, [onChange, duration]);
  var onMouseMove = React.useCallback(function (e) {
    e.preventDefault();

    if (sliderRef && sliderRef.current) {
      var rect = sliderRef.current.getBoundingClientRect();
      var v = getValue(e, rect, duration);
      setValue(v);
    }
  }, [duration]);
  React.useEffect(function () {
    if (sliding) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      return function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
    }

    return function () {};
  }, [sliding, onMouseMove, onMouseUp]);
  var setTooltipVisible = React.useCallback(function (v) {
    return 0 < duration && setVisible(v);
  }, [duration]);
  var onSliderMouseMove = React.useCallback(function (e) {
    e.preventDefault();

    if (sliderRef && sliderRef.current) {
      var rect = sliderRef.current.getBoundingClientRect();
      var v = getValue(e, rect, duration);
      setTooltip(v);
    }
  }, [duration]);
  var bufferedTranslateX = getBufferedTranslateX({
    buffered: buffered,
    currentTime: currentTime,
    sliding: sliding,
    duration: duration
  });
  var trackTranslateX = getTrackTranslateX({
    duration: duration,
    currentTime: currentTime,
    value: value,
    sliding: sliding
  });
  var tooltipTranslateX = getMouseTranslateX({
    duration: duration,
    tooltip: tooltip
  });
  return React.createElement("div", {
    className: sliding ? styles.slidingSlider : styles.slider,
    ref: sliderRef,
    onClick: onClick,
    onMouseOver: function onMouseOver() {
      return setTooltipVisible(true);
    },
    onMouseOut: function onMouseOut() {
      return setTooltipVisible(false);
    },
    onMouseMove: onSliderMouseMove
  }, React.createElement("div", {
    className: styles.sliderRail
  }, React.createElement("div", {
    className: styles.sliderBuffered,
    style: {
      transform: "translateX(".concat(bufferedTranslateX, ")")
    }
  }), React.createElement("div", {
    className: styles.sliderTrack,
    style: {
      transform: "translateX(".concat(trackTranslateX, ")")
    }
  })), React.createElement("div", {
    className: styles.sliderHandleRail,
    style: {
      transform: "translateX(".concat(trackTranslateX, ")")
    }
  }, React.createElement("div", {
    tabIndex: 0,
    className: styles.sliderHandle,
    onMouseDown: function onMouseDown() {
      return setSliding(true);
    }
  })), React.createElement("div", {
    className: styles.tooltip,
    style: {
      transform: "translateX(".concat(tooltipTranslateX, ")"),
      visibility: visible ? 'visible' : 'hidden'
    }
  }, React.createElement("div", {
    className: styles.tip
  }, numeral(tooltip).format('00:00:00'))));
});
Slider.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  buffered: PropTypes.object,
  onChange: PropTypes.func
};
Slider.defaultProps = {
  // currentTime: 0,
  buffered: null,
  // duration: 0,
  onChange: function onChange() {}
};

var css$1 = ".index-module_absolute__2RX-A {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n}\n.index-module_reactPlayerSkin__19Nvi {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  color: #eee;\n  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);\n}\n.index-module_poster__nWX1t {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: #000;\n  object-fit: contain;\n}\n.index-module_videoMask__2LV8U {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: #000;\n}\n.index-module_hiddenVideoMask__1vu35 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: #000;\n  opacity: 0;\n  background: transparent;\n}\n.index-module_controls__7PZ4E {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: auto;\n  padding: 0 16px;\n  transition: transform 0.25s cubic-bezier(0, 0, 0.2, 1);\n}\n.index-module_hiddenControls__22IAT {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: auto;\n  padding: 0 16px;\n  transition: transform 0.25s cubic-bezier(0, 0, 0.2, 1);\n  transform: translate(0, 48px);\n}\n.index-module_waiting__1NGMo,\n.index-module_ended__2Jb4s,\n.index-module_blocked__1InV-,\n.index-module_loading__3quTf {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 50px;\n  background: transparent;\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n.index-module_kernelMsg__3LY19 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  padding: 2em;\n  background: rgba(0, 0, 0, 0.65);\n  overflow-y: auto;\n}\nbutton.index-module_ended__2Jb4s {\n  border: 0;\n  padding: 0;\n  margin: 0;\n  cursor: pointer;\n  background-color: transparent;\n  outline: 0 none transparent;\n}\n.index-module_bar__3DQB9 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  padding: 0 8px 4px;\n}\n.index-module_bar__3DQB9 button {\n  border: 0;\n  padding: 0;\n  margin: 0;\n  cursor: pointer;\n  background-color: transparent;\n  width: 32px;\n  height: 32px;\n  line-height: 32px;\n  font-size: 20px;\n  outline: 0 none transparent;\n  display: inline-block;\n  vertical-align: bottom;\n}\n.index-module_bar__3DQB9 .index-module_textBtn__1YK2c {\n  width: auto;\n  padding: 0 8px;\n  font-size: 14px;\n}\n.index-module_flexItem__1dt6H {\n  flex: 1;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.index-module_controlText__1djOf {\n  height: 32px;\n  line-height: 32px;\n  font-size: 14px;\n  display: inline-block;\n  padding: 0 8px;\n}\n.index-module_volumeSlider__3AzHq {\n  height: 32px;\n  line-height: 32px;\n  font-size: 14px;\n  display: inline-block;\n  padding: 0 8px;\n  width: 120px;\n  vertical-align: bottom;\n  padding-left: 4px;\n  padding-right: 12px;\n}\n.index-module_volumeSlider__3AzHq .ant-slider {\n  margin-top: 10px;\n}\n.index-module_volumeSlider__3AzHq .ant-slider-rail {\n  background: rgba(255, 255, 255, 0.2);\n}\n.index-module_volumeSlider__3AzHq .ant-slider-rail {\n  background: rgba(255, 255, 255, 0.2);\n}\n.index-module_volumeSlider__3AzHq .ant-slider-track {\n  background: rgba(255, 255, 255, 0.85);\n}\n.index-module_volumeSlider__3AzHq .ant-slider-handle {\n  background: rgba(255, 255, 255, 0.85);\n  border: none 0 transparent;\n}\n.index-module_volumeSlider__3AzHq .ant-slider-handle:focus {\n  border: none 0 transparent;\n  box-shadow: none;\n}\n.index-module_volumeSlider__3AzHq .ant-slider:hover .ant-slider-rail {\n  background: rgba(255, 255, 255, 0.2);\n}\n.index-module_volumeSlider__3AzHq .ant-slider:hover .ant-slider-track {\n  background: rgba(255, 255, 255, 0.85);\n}\n.index-module_volumeSlider__3AzHq .ant-slider:hover .ant-slider-handle {\n  background: rgba(255, 255, 255, 0.85);\n  border: none 0 transparent;\n  box-shadow: none;\n}\n.index-module_volumeSlider__3AzHq .ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {\n  border: none 0 transparent;\n  box-shadow: none;\n}\n.index-module_volumeSlider__3AzHq .ant-slider:hover .ant-slider-handle:focus {\n  border: none 0 transparent;\n  box-shadow: none;\n}\n.index-module_liveDot__C-Q8t {\n  width: 6px;\n  height: 6px;\n  display: inline-block;\n  border-radius: 50%;\n  background: #ff0000;\n  margin-right: 8px;\n  vertical-align: middle;\n  position: relative;\n  top: -2px;\n}\n@media (max-width: 575px) {\n  .index-module_volume__NkVH3 {\n    display: none;\n  }\n}\n";
var styles$1 = {"absolute":"index-module_absolute__2RX-A","reactPlayerSkin":"index-module_reactPlayerSkin__19Nvi","poster":"index-module_poster__nWX1t","videoMask":"index-module_videoMask__2LV8U","hiddenVideoMask":"index-module_hiddenVideoMask__1vu35","controls":"index-module_controls__7PZ4E","hiddenControls":"index-module_hiddenControls__22IAT","waiting":"index-module_waiting__1NGMo","ended":"index-module_ended__2Jb4s","blocked":"index-module_blocked__1InV-","loading":"index-module_loading__3quTf","kernelMsg":"index-module_kernelMsg__3LY19","bar":"index-module_bar__3DQB9","textBtn":"index-module_textBtn__1YK2c","flexItem":"index-module_flexItem__1dt6H","controlText":"index-module_controlText__1djOf","volumeSlider":"index-module_volumeSlider__3AzHq","liveDot":"index-module_liveDot__C-Q8t","volume":"index-module_volume__NkVH3"};
styleInject(css$1);

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

var _ref =
/*#__PURE__*/
React.createElement("defs", null, React.createElement("style", null));

var _ref2 =
/*#__PURE__*/
React.createElement("path", {
  d: "M825.757 495.72l126.376-126.644c10.847-10.901 10.847-28.52-.026-39.394-10.875-10.833-28.48-10.847-39.355.027L786.266 456.45 659.782 329.71c-10.875-10.873-28.508-10.86-39.383-.027-10.847 10.873-10.847 28.493-.026 39.394l126.403 126.643-126.403 126.604c-10.82 10.9-10.82 28.52.026 39.393 5.451 5.41 12.565 8.135 19.678 8.135 7.14 0 14.28-2.725 19.705-8.163l126.485-126.716 126.486 126.716c5.424 5.437 12.563 8.163 19.704 8.163a27.761 27.761 0 0 0 19.65-8.135c10.874-10.873 10.874-28.492.027-39.393L825.757 495.719zM473.854 155.018c-9.484-4.674-20.712-3.666-29.134 2.616L216.524 328.428H97.614c-15.398 0-27.852 12.455-27.852 27.84v315.6c0 15.383 12.454 27.84 27.852 27.84h118.91l228.195 170.791a27.722 27.722 0 0 0 16.652 5.546c4.251 0 8.503-.981 12.482-2.93a27.888 27.888 0 0 0 15.344-24.908v-668.28a27.887 27.887 0 0 0-15.343-24.908zm-40.308 637.579L242.44 649.562a27.883 27.883 0 0 0-16.652-5.546H125.413V384.119H225.79a27.876 27.876 0 0 0 16.652-5.546l191.105-143.036v557.06z",
  fill: "#fff"
});

var SvgMuted = function SvgMuted(props) {
  return React.createElement("svg", _extends$1({
    className: "muted_svg__icon",
    viewBox: "0 0 1024 1024",
    width: 64,
    height: 64
  }, props), _ref, _ref2);
};

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

var _ref$1 =
/*#__PURE__*/
React.createElement("defs", null, React.createElement("style", null));

var _ref2$1 =
/*#__PURE__*/
React.createElement("path", {
  d: "M840.088 168.005c-10.785-11.282-28.76-11.697-40.044-.939-11.31 10.798-11.725 28.676-.938 39.96 70.794 73.997 111.39 182.55 111.39 297.807 0 115.27-40.596 223.823-111.418 297.835-10.786 11.282-10.372 29.16.939 39.946a28.305 28.305 0 0 0 19.552 7.81c7.466 0 14.906-2.929 20.49-8.75C920.81 757.274 967.13 634.51 967.13 504.832c0-129.651-46.32-252.417-127.042-336.828zM745.18 254.45c-11.172-10.867-29.092-10.674-40.044.498-10.922 11.185-10.701 29.063.498 39.959 52.128 50.77 82.05 127.314 82.05 209.954 0 82.64-29.922 159.143-82.05 209.914-11.2 10.908-11.42 28.786-.498 39.958a28.27 28.27 0 0 0 20.271 8.53 28.285 28.285 0 0 0 19.773-8.032c62.995-61.363 99.14-152.616 99.14-250.37 0-97.795-36.146-189.035-99.14-250.41zm-96.458 85.959c-12.112-9.886-29.95-7.978-39.85 4.05-9.872 12.085-8.046 29.893 4.066 39.766 32.521 26.435 51.934 71.538 51.934 120.635 0 48.394-18.997 93.121-50.8 119.642-12.003 10.01-13.58 27.832-3.567 39.82 5.614 6.663 13.66 10.12 21.764 10.12a28.326 28.326 0 0 0 18.142-6.566c44.522-37.14 71.099-98.1 71.099-163.015-.002-65.925-27.214-127.37-72.788-164.452zM472.289 140.533c-9.568-4.73-21.1-3.761-29.645 2.64L210.35 316.489H89.28c-15.651 0-28.317 12.638-28.317 28.247v320.236c0 15.624 12.666 28.26 28.317 28.26h121.07l232.294 173.302c4.977 3.733 10.95 5.626 16.95 5.626a28.79 28.79 0 0 0 12.694-2.97c9.569-4.8 15.625-14.576 15.625-25.277V165.807c0-10.715-6.056-20.477-15.624-25.274zm-41.011 646.982L236.73 642.351a28.45 28.45 0 0 0-16.952-5.628H117.598V372.997h102.181a28.453 28.453 0 0 0 16.952-5.627l194.547-145.164v565.309z",
  fill: "#fff"
});

var SvgUnmuted = function SvgUnmuted(props) {
  return React.createElement("svg", _extends$2({
    className: "unmuted_svg__icon",
    viewBox: "0 0 1024 1024",
    width: 64,
    height: 64
  }, props), _ref$1, _ref2$1);
};

var ReactPlayerSkin = React.memo(function (_ref) {
  var src = _ref.src,
      poster = _ref.poster,
      loading = _ref.loading,
      paused = _ref.paused,
      ended = _ref.ended,
      seeking = _ref.seeking,
      waiting = _ref.waiting,
      onPlayClick = _ref.onPlayClick,
      onPauseClick = _ref.onPauseClick,
      duration = _ref.duration,
      buffered = _ref.buffered,
      currentTime = _ref.currentTime,
      changeCurrentTime = _ref.changeCurrentTime,
      muted = _ref.muted,
      volume = _ref.volume,
      changeVolume = _ref.changeVolume,
      onMutedClick = _ref.onMutedClick,
      playbackRate = _ref.playbackRate,
      changePlaybackRate = _ref.changePlaybackRate,
      pictureInPictureEnabled = _ref.pictureInPictureEnabled,
      pip = _ref.pip,
      requestPictureInPicture = _ref.requestPictureInPicture,
      exitPictureInPicture = _ref.exitPictureInPicture,
      x5playsinline = _ref.x5playsinline,
      fullscreen = _ref.fullscreen,
      x5videofullscreen = _ref.x5videofullscreen,
      requestFullscreen = _ref.requestFullscreen,
      exitFullscreen = _ref.exitFullscreen,
      kernelMsg = _ref.kernelMsg;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      hiding = _React$useState2[0],
      setHiding = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      hovering = _React$useState4[0],
      setHovering = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      sliding = _React$useState6[0],
      setSliding = _React$useState6[1];

  var _React$useState7 = React.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      visible = _React$useState8[0],
      setVisible = _React$useState8[1];

  React.useEffect(function () {
    if (hiding || hovering || sliding) {
      return function () {};
    }

    var id = setTimeout(function () {
      return setHiding(true);
    }, 3000);
    return function () {
      return clearTimeout(id);
    };
  }, [hiding, hovering, sliding]);
  React.useEffect(function () {
    if (hiding) {
      setVisible(false);
    }

    return function () {};
  }, [hiding]);
  var onBodyClick = React.useCallback(function () {
    return setVisible(false);
  }, []);
  React.useEffect(function () {
    document.body.addEventListener('click', onBodyClick);
    return function () {
      return document.body.removeEventListener('click', onBodyClick);
    };
  }, [onBodyClick]);
  var onMenuClick = React.useCallback(function (e) {
    changePlaybackRate(parseFloat(e.key, 10));
    setVisible(false);
  }, [changePlaybackRate]);
  return React.createElement("div", {
    className: styles$1.reactPlayerSkin,
    onMouseMove: function onMouseMove() {
      return setHiding(false);
    }
  }, React.createElement("div", {
    className: src ? styles$1.hiddenVideoMask : styles$1.videoMask
  }), poster && (!src || loading) && React.createElement("img", {
    className: styles$1.poster,
    src: poster,
    alt: ""
  }), (waiting || seeking) && !loading && React.createElement("div", {
    className: styles$1.waiting
  }, React.createElement(antd.Icon, {
    type: "loading"
  })), ended && React.createElement("button", {
    className: styles$1.ended,
    onClick: onPlayClick
  }, React.createElement(antd.Icon, {
    type: "play-circle"
  })), React.createElement("div", {
    className: hiding && !hovering && !sliding ? styles$1.hiddenControls : styles$1.controls,
    onMouseEnter: function onMouseEnter() {
      return setHovering(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovering(false);
    }
  }, React.createElement(Slider, {
    duration: duration,
    currentTime: currentTime,
    buffered: buffered,
    setSliding: setSliding,
    onChange: changeCurrentTime
  }), React.createElement("div", {
    className: styles$1.bar
  }, React.createElement("div", {
    className: styles$1.flexItem
  }, ended && React.createElement("button", {
    type: "button",
    onClick: onPlayClick
  }, React.createElement(antd.Icon, {
    type: "caret-right"
  })), paused && !ended && React.createElement("button", {
    type: "button",
    onClick: onPlayClick
  }, React.createElement(antd.Icon, {
    type: "caret-right"
  })), !paused && !ended && React.createElement("button", {
    type: "button",
    onClick: onPauseClick
  }, React.createElement(antd.Icon, {
    type: "pause"
  })), React.createElement("span", {
    className: styles$1.volume
  }, (muted || 0 === volume) && React.createElement("button", {
    type: "button",
    onClick: onMutedClick
  }, React.createElement(antd.Icon, {
    component: SvgMuted
  })), !muted && 0 !== volume && React.createElement("button", {
    type: "button",
    onClick: onMutedClick
  }, React.createElement(antd.Icon, {
    component: SvgUnmuted
  })), React.createElement("span", {
    className: styles$1.volumeSlider
  }, React.createElement(antd.Slider, {
    value: volume * 100,
    onChange: function onChange(v) {
      return changeVolume(v / 100);
    },
    max: 100
  }))), React.createElement("span", {
    className: styles$1.controlText
  }, numeral(currentTime).format('00:00:00'), 0 <= duration ? " / ".concat(numeral(duration).format('00:00:00')) : ''), 0 > duration && React.createElement("span", {
    className: styles$1.controlText
  }, React.createElement("span", {
    className: styles$1.liveDot
  }), "\u76F4\u64AD")), pictureInPictureEnabled && React.createElement("button", {
    type: "button",
    className: styles$1.textBtn,
    onClick: pip ? exitPictureInPicture : requestPictureInPicture
  }, "\u753B\u4E2D\u753B"), 0 <= duration && React.createElement(antd.Dropdown, {
    getPopupContainer: function getPopupContainer(trigger) {
      return trigger.parentNode;
    },
    visible: visible,
    overlay: React.createElement(antd.Menu, {
      selectedKeys: [playbackRate.toString()],
      onClick: onMenuClick
    }, React.createElement(antd.Menu.Item, {
      key: "0.25"
    }, "\xA0\xA00.25 \u500D\u901F\xA0\xA0"), React.createElement(antd.Menu.Item, {
      key: "0.5"
    }, "\xA0\xA00.5 \u500D\u901F\xA0\xA0"), React.createElement(antd.Menu.Item, {
      key: "1"
    }, "\xA0\xA01 \u500D\u901F\xA0\xA0"), React.createElement(antd.Menu.Item, {
      key: "1.25"
    }, "\xA0\xA01.25 \u500D\u901F\xA0\xA0"), React.createElement(antd.Menu.Item, {
      key: "1.5"
    }, "\xA0\xA01.5 \u500D\u901F\xA0\xA0"), React.createElement(antd.Menu.Item, {
      key: "2"
    }, "\xA0\xA02 \u500D\u901F\xA0\xA0"), React.createElement(antd.Menu.Item, {
      key: "4"
    }, "\xA0\xA04 \u500D\u901F\xA0\xA0"), React.createElement(antd.Menu.Item, {
      key: "8"
    }, "\xA0\xA08 \u500D\u901F\xA0\xA0"), React.createElement(antd.Menu.Item, {
      key: "16"
    }, "\xA0\xA016 \u500D\u901F\xA0\xA0")),
    placement: "topRight",
    trigger: ['click']
  }, React.createElement("button", {
    type: "button",
    className: styles$1.textBtn,
    onClick: function onClick() {
      return setVisible(true);
    }
  }, "\u500D\u901F")), fullscreen && React.createElement("button", {
    type: "button",
    onClick: exitFullscreen
  }, React.createElement(antd.Icon, {
    type: "fullscreen-exit"
  })), !fullscreen && React.createElement("button", {
    type: "button",
    onClick: requestFullscreen
  }, React.createElement(antd.Icon, {
    type: "fullscreen"
  })))), x5playsinline && !x5videofullscreen && src && !loading && !waiting && !seeking && !ended && !kernelMsg && React.createElement("button", {
    className: styles$1.blocked,
    onClick: onPlayClick
  }, React.createElement(antd.Icon, {
    type: "play-circle"
  })), loading && !kernelMsg && React.createElement("div", {
    className: styles$1.loading
  }, React.createElement(antd.Icon, {
    type: "loading"
  })), kernelMsg && React.createElement("div", {
    className: styles$1.kernelMsg
  }, kernelMsg.type, ": ", kernelMsg.detail));
});
ReactPlayerSkin.propTypes = {
  src: PropTypes.string,
  poster: PropTypes.string,
  controls: PropTypes.bool.isRequired,
  // state
  loading: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  ended: PropTypes.bool.isRequired,
  seeking: PropTypes.bool.isRequired,
  waiting: PropTypes.bool.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  // time
  duration: PropTypes.number.isRequired,
  buffered: PropTypes.object,
  currentTime: PropTypes.number.isRequired,
  changeCurrentTime: PropTypes.func.isRequired,
  // volume
  muted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  changeVolume: PropTypes.func.isRequired,
  onMutedClick: PropTypes.func.isRequired,
  // playbackRate
  playbackRate: PropTypes.number.isRequired,
  changePlaybackRate: PropTypes.func.isRequired,
  // pip
  pictureInPictureEnabled: PropTypes.bool.isRequired,
  pip: PropTypes.bool.isRequired,
  requestPictureInPicture: PropTypes.func.isRequired,
  exitPictureInPicture: PropTypes.func.isRequired,
  // fullscreen
  x5playsinline: PropTypes.bool.isRequired,
  x5videofullscreen: PropTypes.bool.isRequired,
  fullscreen: PropTypes.bool.isRequired,
  requestFullscreen: PropTypes.func.isRequired,
  exitFullscreen: PropTypes.func.isRequired,
  // kernel
  kernelMsg: PropTypes.object
};
ReactPlayerSkin.defaultProps = {
  src: '',
  poster: '',
  buffered: null,
  kernelMsg: null
};

var ReactPlayerSkinWapper = function ReactPlayerSkinWapper() {
  var props = React.useContext(ReactPlayerContext);
  return React.createElement(ReactPlayerSkin, props);
};

var css$2 = ".index-module_reactPlayer__FpmiE {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  color: #fff;\n  font-size: 14px;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n  font-variant: tabular-nums;\n  line-height: 1.5;\n}\n.index-module_video__5dih7 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: #000;\n}\n";
var styles$2 = {"reactPlayer":"index-module_reactPlayer__FpmiE","video":"index-module_video__5dih7"};
styleInject(css$2);

var useVideoState = (function (_ref, getVideoElement) {
  var src = _ref.src,
      _ref$onCanPlay = _ref.onCanPlay,
      onCanPlay = _ref$onCanPlay === void 0 ? function () {} : _ref$onCanPlay,
      _ref$onPause = _ref.onPause,
      onPause = _ref$onPause === void 0 ? function () {} : _ref$onPause,
      _ref$onPlay = _ref.onPlay,
      onPlay = _ref$onPlay === void 0 ? function () {} : _ref$onPlay,
      _ref$onPlaying = _ref.onPlaying,
      onPlaying = _ref$onPlaying === void 0 ? function () {} : _ref$onPlaying,
      _ref$onEnded = _ref.onEnded,
      onEnded = _ref$onEnded === void 0 ? function () {} : _ref$onEnded,
      _ref$onSeeked = _ref.onSeeked,
      onSeeked = _ref$onSeeked === void 0 ? function () {} : _ref$onSeeked,
      _ref$onSeeking = _ref.onSeeking,
      onSeeking = _ref$onSeeking === void 0 ? function () {} : _ref$onSeeking,
      _ref$onCanPlayThrough = _ref.onCanPlayThrough,
      onCanPlayThrough = _ref$onCanPlayThrough === void 0 ? function () {} : _ref$onCanPlayThrough,
      _ref$onWaiting = _ref.onWaiting,
      onWaiting = _ref$onWaiting === void 0 ? function () {} : _ref$onWaiting;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      loading = _React$useState2[0],
      setLoading = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      paused = _React$useState4[0],
      setPaused = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      ended = _React$useState6[0],
      setEnded = _React$useState6[1];

  var _React$useState7 = React.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      seeking = _React$useState8[0],
      setSeeking = _React$useState8[1];

  var _React$useState9 = React.useState(false),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      waiting = _React$useState10[0],
      setWaiting = _React$useState10[1];

  React.useEffect(function () {
    setLoading(!!src);
    setPaused(false);
    setEnded(false);
    setSeeking(false);
    setWaiting(false);
  }, [src]);
  var onVideoCanPlay = React.useCallback(function (e) {
    setLoading(false);
    setWaiting(false);
    onCanPlay(e);
  }, [onCanPlay]);
  var onVideoPause = React.useCallback(function (e) {
    setPaused(true);
    onPause(e);
  }, [onPause]);
  var onVideoPlay = React.useCallback(function (e) {
    setPaused(false);
    setEnded(false);
    onPlay(e);
  }, [onPlay]);
  var onVideoPlaying = React.useCallback(function (e) {
    setPaused(false);
    setEnded(false);
    onPlaying(e);
  }, [onPlaying]);
  var onVideoEnded = React.useCallback(function (e) {
    setEnded(true);
    onEnded(e);
  }, [onEnded]);
  var onVideoSeeked = React.useCallback(function (e) {
    setSeeking(false);
    onSeeked(e);
  }, [onSeeked]);
  var onVideoSeeking = React.useCallback(function (e) {
    setSeeking(true);
    onSeeking(e);
  }, [onSeeking]);
  var onVideoCanPlayThrough = React.useCallback(function (e) {
    setWaiting(false);
    onCanPlayThrough(e);
  }, [onCanPlayThrough]);
  var onVideoWaiting = React.useCallback(function (e) {
    setWaiting(true);
    onWaiting(e);
  }, [onWaiting]);
  var onPauseClick = React.useCallback(function (t) {
    var el = getVideoElement();

    if (el) {
      el.pause();
    }

    setPaused(true);
  }, [getVideoElement]);
  var onPlayClick = React.useCallback(function (t) {
    var el = getVideoElement();

    if (el) {
      if (ended) {
        el.currentTime = 0; // setEnded(false);
      }

      el.play().catch((e)=>{
	console.log(e);
      });
    }

    setPaused(false);
  }, [getVideoElement, ended]);
  return {
    loading: loading,
    paused: paused,
    ended: ended,
    seeking: seeking,
    waiting: waiting,
    onPauseClick: onPauseClick,
    onPlayClick: onPlayClick,
    // 媒体事件
    onCanPlay: onVideoCanPlay,
    onPause: onVideoPause,
    onPlay: onVideoPlay,
    onPlaying: onVideoPlaying,
    onEnded: onVideoEnded,
    onSeeked: onVideoSeeked,
    onSeeking: onVideoSeeking,
    onCanPlayThrough: onVideoCanPlayThrough,
    onWaiting: onVideoWaiting
  };
});

var useVideoTime = (function (props, getVideoElement) {
  var live = props.live,
      src = props.src,
      onDurationChange = props.onDurationChange,
      onTimeUpdate = props.onTimeUpdate,
      onProgress = props.onProgress;

  var _React$useState = React.useState(live ? -1 : 0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      duration = _React$useState2[0],
      setDuration = _React$useState2[1];

  var _React$useState3 = React.useState(0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      currentTime = _React$useState4[0],
      setCurrentTime = _React$useState4[1];

  var _React$useState5 = React.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      buffered = _React$useState6[0],
      setBuffered = _React$useState6[1];

  React.useEffect(function () {
    setDuration(live ? -1 : 0);
    setCurrentTime(0);
    setBuffered(null);
  }, [src, live]);
  var onVideoDurationChange = React.useCallback(function (e) {
    if (!live) {
      setDuration(e.target.duration);
    }

    onDurationChange(e);
  }, [live, onDurationChange]);
  var onVideoTimeUpdate = React.useCallback(function (e) {
    setCurrentTime(e.target.currentTime);
    onTimeUpdate(e);
  }, [onTimeUpdate]);
  var onVideoProgress = React.useCallback(function (e) {
    setBuffered(e.target.buffered);
    onProgress(e);
  }, [onProgress]);
  var changeCurrentTime = React.useCallback(function (t) {
    var el = getVideoElement();

    if (el) {
      el.currentTime = t;
    }

    setCurrentTime(t);
  }, [getVideoElement]);
  return {
    duration: duration,
    currentTime: currentTime,
    buffered: buffered,
    changeCurrentTime: changeCurrentTime,
    // 媒体事件
    onDurationChange: onVideoDurationChange,
    onTimeUpdate: onVideoTimeUpdate,
    onProgress: onVideoProgress
  };
});

var useVideoVolume = (function (props, getVideoElement) {
  var mutedProp = props.muted,
      onVolumeChange = props.onVolumeChange;

  var _React$useState = React.useState(mutedProp),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      muted = _React$useState2[0],
      setMuted = _React$useState2[1];

  var _React$useState3 = React.useState(1),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      volume = _React$useState4[0],
      setVolume = _React$useState4[1];

  var onVideoVolumeChange = React.useCallback(function (e) {
    var v = e.target.volume;
    var m = 0 === v ? true : e.target.muted;
    setVolume(v);
    setMuted(m);
    onVolumeChange(e);
  }, [onVolumeChange]);
  var onMutedClick = React.useCallback(function (e) {
    var el = getVideoElement();

    if (el) {
      el.muted = !muted;

      if (0 === volume && muted) {
        el.volume = 1;
      }
    }
  }, [getVideoElement, muted, volume]);
  var changeVolume = React.useCallback(function (v) {
    var el = getVideoElement();

    if (el) {
      el.volume = v;
    }
  }, [getVideoElement]);
  return {
    muted: muted,
    volume: volume,
    onMutedClick: onMutedClick,
    changeVolume: changeVolume,
    // 媒体事件
    onVolumeChange: onVideoVolumeChange
  };
});

var useVideoPlaybackRate = (function (props, getVideoElement) {
  var live = props.live,
      onRateChange = props.onRateChange;

  var _React$useState = React.useState(1),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      playbackRate = _React$useState2[0],
      setPlaybackRate = _React$useState2[1];

  var onVideoRateChange = React.useCallback(function (e) {
    setPlaybackRate(e.target.playbackRate);
    onRateChange(e);
  }, [onRateChange]);
  var changePlaybackRate = React.useCallback(function (r) {
    var el = getVideoElement();

    if (el) {
      el.playbackRate = r;
      setPlaybackRate(r);
    }
  }, [getVideoElement]);
  React.useEffect(function () {
    if (live) {
      setPlaybackRate(1);
      changePlaybackRate(1);
    }
  }, [live, changePlaybackRate]);
  return {
    playbackRate: playbackRate,
    changePlaybackRate: changePlaybackRate,
    // 媒体事件
    onRateChange: onVideoRateChange
  };
});

var noop = function noop() {};

var useVideoPiP = (function (_ref, getVideoElement) {
  var src = _ref.src;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      enabled = _React$useState2[0],
      setEnabled = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      pip = _React$useState4[0],
      setPiP = _React$useState4[1];

  React.useEffect(function () {
    setEnabled(!!document.pictureInPictureEnabled);
  }, []);
  var requestPictureInPicture = React.useCallback(function (v) {
    var el = getVideoElement();

    if (el && el.requestPictureInPicture) {
      el.requestPictureInPicture();
    }
  }, [getVideoElement]);
  var exitPictureInPicture = React.useCallback(function (e) {
    if (document.exitPictureInPicture) {
      document.exitPictureInPicture();
    }
  }, []);
  React.useEffect(function () {
    if (pip && !src) {
      exitPictureInPicture();
    }
  }, [src, pip, exitPictureInPicture]);
  var onenterpictureinpicture = React.useCallback(function (e) {
    setPiP(true);
  }, []);
  var onleavepictureinpicture = React.useCallback(function (e) {
    setPiP(false);
  }, []);
  React.useEffect(function () {
    var el = getVideoElement();

    if (!el) {
      return noop;
    }

    el.addEventListener('enterpictureinpicture', onenterpictureinpicture);
    el.addEventListener('leavepictureinpicture', onleavepictureinpicture);
    return function () {
      el.removeEventListener('enterpictureinpicture', onenterpictureinpicture);
      el.removeEventListener('leavepictureinpicture', onleavepictureinpicture);
    };
  }, [getVideoElement, onenterpictureinpicture, onleavepictureinpicture]);
  return {
    pictureInPictureEnabled: enabled,
    pip: pip,
    requestPictureInPicture: requestPictureInPicture,
    exitPictureInPicture: exitPictureInPicture
  };
});

var debug = console.error;
var useVideoFullscreen = (function (_ref, getVideoElement, getPlayerElement) {
  var x5playsinline = _ref.x5playsinline,
      _ref$onFullscreenChan = _ref.onFullscreenChange,
      onFullscreenChange = _ref$onFullscreenChan === void 0 ? function () {} : _ref$onFullscreenChan;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      fullscreen = _React$useState2[0],
      setFullscreen = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      x5videofullscreen = _React$useState4[0],
      setX5videofullscreen = _React$useState4[1];

  var requestFullscreen = React.useCallback(function (v) {
    if (x5playsinline) {
      if (x5videofullscreen) {
        setFullscreen(true);
      } else {
        // 异常分支
        debug('useVideoFullscreen: 全屏异常，未进入同层播放的情况下触发了全屏');
        var videoEl = getVideoElement();

        if (videoEl && videoEl.play) {
          videoEl.play().catch((e)=>{
	  });
        }
      }

      return;
    }

    var el = getPlayerElement();

    if (el && el.requestFullscreen) {
      el.requestFullscreen();
    } else {
      // 异常分支，不应该进入
      debug('useVideoFullscreen: 全屏异常，浏览器不支持 requestFullscreen');
    }
  }, [getVideoElement, getPlayerElement, x5playsinline, x5videofullscreen]);
  var exitFullscreen = React.useCallback(function (v) {
    if (x5playsinline) {
      setFullscreen(false);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else {
      // 异常分支，不应该进入
      debug('useVideoFullscreen: 退出全屏异常，浏览器不支持 exitFullscreen');
    }
  }, [x5playsinline]);
  var onChange = React.useCallback(function (v) {
    var el = getPlayerElement();
    setFullscreen(!!el && document.fullscreenElement === el);
  }, [getPlayerElement]);
  React.useEffect(function () {
    document.addEventListener('fullscreenchange', onChange);
    return function () {
      document.removeEventListener('fullscreenchange', onChange);
    };
  }, [onChange]);
  var onResize = React.useCallback(function () {
    var el = getVideoElement();

    if (el) {
      el.style.width = "".concat(global.innerWidth, "px");
      el.style.height = "".concat(global.innerHeight, "px");
    }
  }, [getVideoElement]);
  React.useEffect(function () {
    if (!x5playsinline) {
      return function () {};
    }

    global.addEventListener('resize', onResize);
    return function () {
      global.removeEventListener('resize', onResize);
    };
  }, [x5playsinline, onResize]);
  var onx5videoenterfullscreen = React.useCallback(function () {
    setX5videofullscreen(true);
  }, []); // 退出同层播放时应该同时退出全屏状态

  var onx5videoexitfullscreen = React.useCallback(function () {
    setFullscreen(false);
    setX5videofullscreen(false);
  }, []); // 同层播放事件订阅处理

  React.useEffect(function () {
    if (!x5playsinline) {
      return function () {};
    }

    var el = getVideoElement();

    if (!el) {
      return function () {};
    }

    el.addEventListener('x5videoenterfullscreen', onx5videoenterfullscreen);
    el.addEventListener('x5videoexitfullscreen', onx5videoexitfullscreen);
    return function () {
      el.removeEventListener('x5videoenterfullscreen', onx5videoenterfullscreen);
      el.removeEventListener('x5videoexitfullscreen', onx5videoexitfullscreen);
    };
  }, [x5playsinline, getVideoElement, onx5videoenterfullscreen, onx5videoexitfullscreen]); // fullscreen 或 x5videofullscreen 状态变化通知

  React.useEffect(function () {
    onFullscreenChange({
      x5videofullscreen: x5videofullscreen,
      fullscreen: fullscreen
    });
    return function () {};
  }, [x5videofullscreen, fullscreen, onFullscreenChange]);
  return {
    fullscreen: fullscreen,
    x5videofullscreen: x5videofullscreen,
    requestFullscreen: requestFullscreen,
    exitFullscreen: exitFullscreen
  };
});

var useHlsjs = (function (_ref, getVideoElement) {
  var src = _ref.src,
      config = _ref.config,
      onKernelError = _ref.onKernelError;

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      hlsPlayer = _React$useState2[0],
      setHlsPlayer = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      kernelMsg = _React$useState4[0],
      setKernelMsg = _React$useState4[1];

  React.useEffect(function () {
    var el = getVideoElement();

    if (!el || !src) {
      setHlsPlayer(null);
      return function () {};
    }

    var hls = new Hls(Object.assign({
      debug: false,
      enableWorker: false
    }, config));
    hls.loadSource(src);
    setHlsPlayer(hls);
    return function () {
      setHlsPlayer(null);
    };
  }, [getVideoElement, src, config]);
  React.useEffect(function () {
    if (!hlsPlayer) {
      return function () {};
    }

    var el = getVideoElement();

    if (el) {
      hlsPlayer.attachMedia(el);
      hlsPlayer.on(Hls.Events.MANIFEST_PARSED, function () {
        return el.play().catch((e)=>{
	});
      });
    }

    return function () {
      try {
        hlsPlayer.destroy();
      } catch (errMsg) {}
    };
  }, [getVideoElement, hlsPlayer]);
  var onError = React.useCallback(function (e, info) {
    if (info && info.fatal) {
      var msg = {
        type: info.type,
        detail: info.details
      };
      setKernelMsg(msg);
      onKernelError(msg);
    }
  }, [onKernelError]);
  React.useEffect(function () {
    if (!hlsPlayer) {
      setKernelMsg(null);
      return function () {};
    }

    hlsPlayer.on(Hls.Events.ERROR, onError);
    return function () {
      try {
        hlsPlayer.off(Hls.Events.ERROR);
      } catch (errMsg) {}

      setKernelMsg(null);
    };
  }, [hlsPlayer, onError]);
  return {
    kernelPlayer: hlsPlayer,
    kernelMsg: kernelMsg
  };
});

var useFlvjs = (function (_ref, getVideoElement) {
  var src = _ref.src,
      config = _ref.config,
      onKernelError = _ref.onKernelError;

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      flvPlayer = _React$useState2[0],
      setFlvPlayer = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      kernelMsg = _React$useState4[0],
      setKernelMsg = _React$useState4[1];

  React.useEffect(function () {
    var el = getVideoElement();

    if (!el || !src) {
      setFlvPlayer(null);
      return function () {};
    }

    var _config$flvType = config.flvType,
        flvType = _config$flvType === void 0 ? "flv" : _config$flvType,
        _config$hasAudio = config.hasAudio,
        hasAudio = _config$hasAudio === void 0 ? true : _config$hasAudio,
        _config$hasVideo = config.hasVideo,
        hasVideo = _config$hasVideo === void 0 ? true : _config$hasVideo,
        otherConfig = _objectWithoutProperties(config, ["flvType", "hasAudio", "hasVideo"]);

    setFlvPlayer(flvjs.createPlayer({
      isLive: true,
      type: flvType,
      hasAudio: hasAudio,
      hasVideo: hasVideo,
      url: src
    }, _objectSpread({}, config)));
    return function () {
      setFlvPlayer(null);
    };
  }, [getVideoElement, src, config]);
  React.useEffect(function () {
    if (!flvPlayer) {
      return function () {};
    }

    var el = getVideoElement();

    if (el) {
      flvPlayer.attachMediaElement(el);
      flvPlayer.load();
      flvPlayer.play().catch((e)=>{
	});
    }

    return function () {
      try {
        flvPlayer.pause();
      } catch (errMsg) {}

      try {
        flvPlayer.unload();
      } catch (errMsg) {}

      try {
        flvPlayer.detachMediaElement();
      } catch (errMsg) {}

      try {
        flvPlayer.destroy();
      } catch (errMsg) {}
    };
  }, [getVideoElement, flvPlayer]);
  var onError = React.useCallback(function (type, detail) {
    var info = {
      type: type,
      detail: detail
    };
    setKernelMsg(info);
    onKernelError(info);
  }, [onKernelError]);
  React.useEffect(function () {
    if (!flvPlayer) {
      return function () {};
    }

    flvPlayer.on(flvjs.Events.ERROR, onError);
    return function () {
      try {
        flvPlayer.off(flvjs.Events.ERROR);
      } catch (errMsg) {}
    };
  }, [flvPlayer, onError]);
  return {
    kernelPlayer: flvPlayer,
    kernelMsg: kernelMsg
  };
});

var useNative = (function (_ref, getVideoElement) {
  var src = _ref.src;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      loaded = _React$useState2[0],
      setLoaded = _React$useState2[1];

  React.useEffect(function () {
    var el = getVideoElement();

    if (!el || !src) {
      return function () {};
    }

    el.src = src;
    el.load();
    el.play().catch((e)=>{
	});
    return function () {
      el.pause();
      el.src = '';

      try {
        el.load();
      } catch (errMsg) {}
    };
  }, [getVideoElement, src]);
  var onDocumentClick = React.useCallback(function () {
    var el = getVideoElement();

    if (!el) {
      setLoaded(false);
      return function () {};
    }

    el.src = '';
    el.load();
    setLoaded(true);
  }, [getVideoElement]);
  React.useEffect(function () {
    document.addEventListener('click', onDocumentClick);
    return function () {
      document.removeEventListener('click', onDocumentClick);
    };
  }, [onDocumentClick]);
  React.useEffect(function () {
    if (loaded) {
      document.removeEventListener('click', onDocumentClick);
    }

    return function () {};
  }, [loaded, onDocumentClick]);
  return {
    kernelPlayer: getVideoElement(),
    kernelMsg: null
  };
});

var noop$1 = function noop() {};

var getRenderHooks = function getRenderHooks(kernel) {
  switch (kernel) {
    case 'native':
      return useNative;

    case 'hlsjs':
      return useHlsjs;

    case 'flvjs':
      return useFlvjs;

    default:
      console.error("ReactPlayer: \u6682\u4E0D\u652F\u6301 kernel(".concat(kernel, ")"));
      return noop$1;
  }
};

var ReactPlayer = function ReactPlayer(_ref, ref) {
  var kernel = _ref.kernel,
      live = _ref.live,
      _ref$config = _ref.config,
      config = _ref$config === void 0 ? null : _ref$config,
      _ref$onKernelError = _ref.onKernelError,
      onKernelError = _ref$onKernelError === void 0 ? noop$1 : _ref$onKernelError,
      _ref$src = _ref.src,
      src = _ref$src === void 0 ? '' : _ref$src,
      type = _ref.type,
      _ref$controls = _ref.controls,
      controls = _ref$controls === void 0 ? true : _ref$controls,
      _ref$poster = _ref.poster,
      poster = _ref$poster === void 0 ? '' : _ref$poster,
      _ref$muted = _ref.muted,
      muted = _ref$muted === void 0 ? false : _ref$muted,
      _ref$allowDbClickFull = _ref.allowDbClickFullScreen,
      allowDbClickFullScreen = _ref$allowDbClickFull === void 0 ? true : _ref$allowDbClickFull,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$videoProps = _ref.videoProps,
      videoProps = _ref$videoProps === void 0 ? null : _ref$videoProps,
      _ref$playerProps = _ref.playerProps,
      playerProps = _ref$playerProps === void 0 ? null : _ref$playerProps,
      _ref$onCanPlay = _ref.onCanPlay,
      onCanPlay = _ref$onCanPlay === void 0 ? noop$1 : _ref$onCanPlay,
      _ref$onDurationChange = _ref.onDurationChange,
      onDurationChange = _ref$onDurationChange === void 0 ? noop$1 : _ref$onDurationChange,
      _ref$onTimeUpdate = _ref.onTimeUpdate,
      onTimeUpdate = _ref$onTimeUpdate === void 0 ? noop$1 : _ref$onTimeUpdate,
      _ref$onPause = _ref.onPause,
      onPause = _ref$onPause === void 0 ? noop$1 : _ref$onPause,
      _ref$onPlay = _ref.onPlay,
      onPlay = _ref$onPlay === void 0 ? noop$1 : _ref$onPlay,
      _ref$onPlaying = _ref.onPlaying,
      onPlaying = _ref$onPlaying === void 0 ? noop$1 : _ref$onPlaying,
      _ref$onEnded = _ref.onEnded,
      onEnded = _ref$onEnded === void 0 ? noop$1 : _ref$onEnded,
      _ref$onSeeked = _ref.onSeeked,
      onSeeked = _ref$onSeeked === void 0 ? noop$1 : _ref$onSeeked,
      _ref$onSeeking = _ref.onSeeking,
      onSeeking = _ref$onSeeking === void 0 ? noop$1 : _ref$onSeeking,
      _ref$onCanPlayThrough = _ref.onCanPlayThrough,
      onCanPlayThrough = _ref$onCanPlayThrough === void 0 ? noop$1 : _ref$onCanPlayThrough,
      _ref$onEmptied = _ref.onEmptied,
      onEmptied = _ref$onEmptied === void 0 ? noop$1 : _ref$onEmptied,
      _ref$onEncrypted = _ref.onEncrypted,
      onEncrypted = _ref$onEncrypted === void 0 ? noop$1 : _ref$onEncrypted,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? noop$1 : _ref$onError,
      _ref$onLoadedData = _ref.onLoadedData,
      onLoadedData = _ref$onLoadedData === void 0 ? noop$1 : _ref$onLoadedData,
      _ref$onLoadedMetadata = _ref.onLoadedMetadata,
      onLoadedMetadata = _ref$onLoadedMetadata === void 0 ? noop$1 : _ref$onLoadedMetadata,
      _ref$onLoadStart = _ref.onLoadStart,
      onLoadStart = _ref$onLoadStart === void 0 ? noop$1 : _ref$onLoadStart,
      _ref$onProgress = _ref.onProgress,
      onProgress = _ref$onProgress === void 0 ? noop$1 : _ref$onProgress,
      _ref$onRateChange = _ref.onRateChange,
      onRateChange = _ref$onRateChange === void 0 ? noop$1 : _ref$onRateChange,
      _ref$onStalled = _ref.onStalled,
      onStalled = _ref$onStalled === void 0 ? noop$1 : _ref$onStalled,
      _ref$onSuspend = _ref.onSuspend,
      onSuspend = _ref$onSuspend === void 0 ? noop$1 : _ref$onSuspend,
      _ref$onVolumeChange = _ref.onVolumeChange,
      onVolumeChange = _ref$onVolumeChange === void 0 ? noop$1 : _ref$onVolumeChange,
      _ref$onWaiting = _ref.onWaiting,
      onWaiting = _ref$onWaiting === void 0 ? noop$1 : _ref$onWaiting,
      _ref$onAbort = _ref.onAbort,
      onAbort = _ref$onAbort === void 0 ? noop$1 : _ref$onAbort,
      _ref$x5playsinline = _ref.x5playsinline,
      x5playsinline = _ref$x5playsinline === void 0 ? false : _ref$x5playsinline,
      _ref$onFullscreenChan = _ref.onFullscreenChange,
      onFullscreenChange = _ref$onFullscreenChan === void 0 ? noop$1 : _ref$onFullscreenChan,
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? null : _ref$children;
  var videoRef = React.useRef(null);
  var playerRef = React.useRef(null);

  var _getVideoElement = React.useCallback(function () {
    return videoRef && videoRef.current;
  }, []);

  var getPlayerElement = React.useCallback(function () {
    return playerRef && playerRef.current;
  }, []);
  var stateProps = useVideoState({
    src: src,
    onCanPlay: onCanPlay,
    onPause: onPause,
    onPlay: onPlay,
    onPlaying: onPlaying,
    onEnded: onEnded,
    onSeeked: onSeeked,
    onSeeking: onSeeking,
    onCanPlayThrough: onCanPlayThrough,
    onWaiting: onWaiting
  }, _getVideoElement);
  var timeProps = useVideoTime({
    live: live,
    src: src,
    onDurationChange: onDurationChange,
    onTimeUpdate: onTimeUpdate,
    onProgress: onProgress
  }, _getVideoElement);
  var volumeProps = useVideoVolume({
    muted: muted,
    onVolumeChange: onVolumeChange
  }, _getVideoElement);
  var playbackRateProps = useVideoPlaybackRate({
    live: live,
    onRateChange: onRateChange
  }, _getVideoElement);
  var piPProps = useVideoPiP({
    src: src
  }, _getVideoElement);
  var fullscreenProps = useVideoFullscreen({
    x5playsinline: x5playsinline,
    onFullscreenChange: onFullscreenChange
  }, _getVideoElement, getPlayerElement);

  var _getRenderHooks = getRenderHooks(kernel)({
    src: src,
    config: config,
    onKernelError: onKernelError
  }, _getVideoElement),
      kernelPlayer = _getRenderHooks.kernelPlayer,
      kernelMsg = _getRenderHooks.kernelMsg;

  React.useImperativeHandle(ref, function () {
    return {
      isPlaying: function isPlaying() {
        return src && !(stateProps.loading || stateProps.waiting || stateProps.ended || stateProps.paused);
      },
      isFullscreen: function isFullscreen() {
        return fullscreenProps.fullscreen;
      },
      getVideoElement: function getVideoElement() {
        return _getVideoElement();
      },
      getPlayerElement: function getPlayerElement() {
        return _getVideoElement();
      },
      requestFullscreen: function requestFullscreen(v) {
        return fullscreenProps.requestFullscreen();
      },
      exitFullscreen: function exitFullscreen(v) {
        return fullscreenProps.exitFullscreen();
      },
      getCurrentTime: function getCurrentTime() {
        return timeProps.currentTime;
      },
      setCurrentTime: function setCurrentTime(ct) {
        return timeProps.changeCurrentTime(ct);
      },
      getBuffered: function getBuffered() {
        return timeProps.buffered;
      },
      getPlaybackRate: function getPlaybackRate() {
        return playbackRateProps.playbackRate;
      },
      setPlaybackRate: function setPlaybackRate(rate) {
        return playbackRateProps.changePlaybackRate(rate);
      },
      isPiP: function isPiP() {
        return piPProps.pictureInPictureEnabled && piPProps.pip;
      },
      pause: function pause() {
        return stateProps.onPauseClick();
      },
      play: function play() {
        return stateProps.onPlayClick();
      },
      getKernelPlayer: function getKernelPlayer() {
        return kernelPlayer;
      },
      getKernel: function getKernel() {
        return kernel;
      }
    };
  });
  var cbClickFullScreen = React.useCallback(function () {
    fullscreenProps.fullscreen ? fullscreenProps.exitFullscreen() : fullscreenProps.requestFullscreen(); //playerProps.onDoubleClick && playerProps.onDoubleClick();
  }, [fullscreenProps]);
  return React.createElement("div", _extends({
    className: "".concat(styles$2.reactPlayer, " ").concat(className),
    ref: playerRef,
    onDoubleClick: allowDbClickFullScreen ? cbClickFullScreen : function () {
      return null;
    }
  }, playerProps), React.createElement("video", _extends({
    className: styles$2.video,
    ref: videoRef,
    controls: 'controls' === controls,
    type: type // webkit-playsinline={props.playsInline}
    // playsInline={props.playsInline}
    // x5-playsinline={props.playsInline}
    // x5-video-player-type="h5"
    // x5-video-player-fullscreen="true"
    // x5-video-orientation="landscape|portrait"

  }, videoProps, {
    // useVideoState
    onCanPlay: stateProps.onCanPlay,
    onPause: stateProps.onPause,
    onPlay: stateProps.onPlay,
    onPlaying: stateProps.onPlaying,
    onEnded: stateProps.onEnded,
    onSeeked: stateProps.onSeeked,
    onSeeking: stateProps.onSeeking,
    onCanPlayThrough: stateProps.onCanPlayThrough,
    onWaiting: stateProps.onWaiting // useVideoTime
    ,
    onDurationChange: timeProps.onDurationChange,
    onTimeUpdate: timeProps.onTimeUpdate,
    onProgress: timeProps.onProgress // useVideoVolume
    ,
    muted: volumeProps.muted,
    onVolumeChange: volumeProps.onVolumeChange // useVideoPlaybackRate
    ,
    onRateChange: playbackRateProps.onRateChange // 未处理媒体事件
    ,
    onEmptied: onEmptied,
    onEncrypted: onEncrypted,
    onError: onError,
    onLoadedData: onLoadedData,
    onLoadedMetadata: onLoadedMetadata,
    onLoadStart: onLoadStart,
    onStalled: onStalled,
    onSuspend: onSuspend,
    onAbort: onAbort
  })), React.createElement(ReactPlayerContext.Provider, {
    value: _objectSpread({
      src: src,
      controls: controls,
      poster: poster,
      // useVideoState
      loading: stateProps.loading,
      paused: stateProps.paused,
      ended: stateProps.ended,
      seeking: stateProps.seeking,
      waiting: stateProps.waiting,
      onPauseClick: stateProps.onPauseClick,
      onPlayClick: stateProps.onPlayClick,
      // useVideoTime
      duration: timeProps.duration,
      currentTime: timeProps.currentTime,
      buffered: timeProps.buffered,
      changeCurrentTime: timeProps.changeCurrentTime,
      // useVideoVolume
      muted: volumeProps.muted,
      volume: volumeProps.volume,
      onMutedClick: volumeProps.onMutedClick,
      changeVolume: volumeProps.changeVolume,
      // useVideoPlaybackRate
      playbackRate: playbackRateProps.playbackRate,
      changePlaybackRate: playbackRateProps.changePlaybackRate
    }, piPProps, {
      x5playsinline: x5playsinline
    }, fullscreenProps, {
      kernelMsg: kernelMsg
    })
  }, true === controls && React.createElement(ReactPlayerSkinWapper, null), children));
};

ReactPlayer.propTypes = {
  kernel: PropTypes.oneOf(['hlsjs', 'flvjs', 'native']).isRequired,
  live: PropTypes.bool.isRequired,
  config: PropTypes.object,
  onKernelError: PropTypes.func,
  src: PropTypes.string,
  type: PropTypes.string.isRequired,
  controls: PropTypes.oneOf([false, true, 'controls']),
  poster: PropTypes.string,
  muted: PropTypes.bool,
  allowDbClickFullScreen: PropTypes.bool,
  // volume: PropTypes.number,
  // autoPlay: PropTypes.bool,
  className: PropTypes.string,
  videoProps: PropTypes.object,
  playerProps: PropTypes.object,
  onCanPlay: PropTypes.func,
  onDurationChange: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onPlaying: PropTypes.func,
  onEnded: PropTypes.func,
  onSeeked: PropTypes.func,
  onSeeking: PropTypes.func,
  onCanPlayThrough: PropTypes.func,
  onEmptied: PropTypes.func,
  onEncrypted: PropTypes.func,
  onError: PropTypes.func,
  onLoadedData: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onLoadStart: PropTypes.func,
  onProgress: PropTypes.func,
  onRateChange: PropTypes.func,
  onStalled: PropTypes.func,
  onSuspend: PropTypes.func,
  onVolumeChange: PropTypes.func,
  onWaiting: PropTypes.func,
  onAbort: PropTypes.func,
  x5playsinline: PropTypes.bool,
  onFullscreenChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
ReactPlayer.defaultProps = {
  config: null,
  onKernelError: noop$1,
  src: '',
  controls: true,
  poster: '',
  muted: false,
  allowDbClickFullScreen: true,
  // autoPlay: true,
  className: '',
  videoProps: null,
  playerProps: null,
  onCanPlay: noop$1,
  onDurationChange: noop$1,
  onTimeUpdate: noop$1,
  onPause: noop$1,
  onPlay: noop$1,
  onPlaying: noop$1,
  onEnded: noop$1,
  onSeeked: noop$1,
  onSeeking: noop$1,
  onCanPlayThrough: noop$1,
  onEmptied: noop$1,
  onEncrypted: noop$1,
  onError: noop$1,
  onLoadedData: noop$1,
  onLoadedMetadata: noop$1,
  onLoadStart: noop$1,
  onProgress: noop$1,
  onRateChange: noop$1,
  onStalled: noop$1,
  onSuspend: noop$1,
  onVolumeChange: noop$1,
  onWaiting: noop$1,
  onAbort: noop$1,
  x5playsinline: false,
  onFullscreenChange: noop$1,
  children: null
};
var ReactPlayer$1 = React.forwardRef(ReactPlayer);

var css$3 = ".index-module_grindPlayer__b19eE {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  min-width: 400px;\n  min-height: 300px;\n  overflow: hidden;\n  background: #000;\n}\n";
var styles$3 = {"grindPlayer":"index-module_grindPlayer__b19eE"};
styleInject(css$3);

var GrindPlayer = function GrindPlayer(_ref) {
  var live = _ref.live,
      src = _ref.src,
      type = _ref.type,
      grindPlayerSwf = _ref.grindPlayerSwf,
      flashlsOSMFSwf = _ref.flashlsOSMFSwf;

  if (!src) {
    return React.createElement("div", {
      className: styles$3.grindPlayer
    });
  }

  var flashVars = {
    src: src,
    autoPlay: true,
    bufferTime: 0.5,
    streamType: live ? 'live' : 'recorded'
  };

  if ('application/x-mpegURL' === type) {
    flashVars.plugin_hls = flashlsOSMFSwf;
  }

  return React.createElement("div", {
    className: styles$3.grindPlayer
  }, React.createElement(ReactSWF, {
    src: grindPlayerSwf,
    width: "100%",
    height: "100%",
    wmode: "opaque",
    allowFullScreen: true,
    allowScriptAccess: "always",
    bgcolor: "#000000",
    flashVars: flashVars
  }));
};

GrindPlayer.propTypes = {
  live: PropTypes.bool,
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  grindPlayerSwf: PropTypes.string,
  flashlsOSMFSwf: PropTypes.string
};
GrindPlayer.defaultProp = {
  live: true,
  grindPlayerSwf: 'http://unpkg.com/reactjs-player/dist/GrindPlayer.swf',
  flashlsOSMFSwf: 'http://unpkg.com/reactjs-player/dist/flashlsOSMF.swf'
};

ReactPlayer$1.GrindPlayer = GrindPlayer;
ReactPlayer$1.ReactPlayerContext = ReactPlayerContext;
ReactPlayer$1.ReactPlayerSkin = ReactPlayerSkin;

module.exports = ReactPlayer$1;
//# sourceMappingURL=index.js.map
