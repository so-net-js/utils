"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

/**
 * Empty function
 */
function nop() {}

function iterateSync(target, callback, accumulate) {
  if ((0, _typeof2["default"])(target) !== 'object') throw new Error('target must be an "object" or an "array"');

  if (Array.isArray(target)) {
    for (var i = 0; i < target.length; i++) {
      var idx = i;
      var value = target[i];
      var key = idx;

      var setKey = function setKey(newKey) {
        key = newKey;
      };

      var res = callback(value, idx, setKey);

      if (accumulate) {
        accumulate[key] = res;
      }
    }
  } else {
    var keys = Object.keys(target);

    for (var _i = 0; _i < keys.length; _i++) {
      var _idx = keys[_i];
      var _value = target[_idx];
      var _key = _idx;

      var _setKey = function _setKey(newKey) {
        _key = newKey;
      };

      var _res = callback(_value, _idx, _setKey);

      if (accumulate) {
        if (Array.isArray(accumulate)) {
          accumulate[_i] = _res;
        } else {
          accumulate[_key] = _res;
        }
      }
    }
  }

  return accumulate;
}

var _default = {
  nop: nop,
  iterateSync: iterateSync
};
exports["default"] = _default;