"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _math = _interopRequireDefault(require("./math"));

var _id = _interopRequireDefault(require("./id"));

var _async = _interopRequireDefault(require("./async"));

var _utils = _interopRequireDefault(require("./utils"));

var o = {
  x: 1,
  y: 2,
  z: 3
};

var res = _utils["default"].iterateSync(o, function (val, idx) {
  console.log('Entry:', val, idx);
});

console.log(res);
var _default = {
  math: _math["default"],
  id: _id["default"],
  async: _async["default"],
  utils: _utils["default"]
};
exports["default"] = _default;