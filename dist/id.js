"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _v = _interopRequireDefault(require("uuid/v1"));

var _nanoid = _interopRequireDefault(require("nanoid"));

/**
 * Generates UUID
 * @returns {string}
 */
function uuid() {
  return (0, _v["default"])();
}
/**
 * Generates NANO ID
 * @returns {string}
 */


function nano() {
  return (0, _nanoid["default"])();
}

var _default = {
  uuid: uuid,
  nano: nano
};
exports["default"] = _default;