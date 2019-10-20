"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

Function.prototype.$asyncbind = function $asyncbind(self, catcher) {
  "use strict";

  if (!Function.prototype.$asyncbind) {
    Object.defineProperty(Function.prototype, "$asyncbind", {
      value: $asyncbind,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }

  if (!$asyncbind.trampoline) {
    $asyncbind.trampoline = function trampoline(t, x, s, e, u) {
      return function b(q) {
        while (q) {
          if (q.then) {
            q = q.then(b, e);
            return u ? undefined : q;
          }

          try {
            if (q.pop) {
              if (q.length) return q.pop() ? x.call(t) : q;
              q = s;
            } else q = q.call(t);
          } catch (r) {
            return e(r);
          }
        }
      };
    };
  }

  if (!$asyncbind.LazyThenable) {
    $asyncbind.LazyThenable = function () {
      function isThenable(obj) {
        return obj && obj instanceof Object && typeof obj.then === "function";
      }

      function resolution(p, r, how) {
        try {
          var x = how ? how(r) : r;
          if (p === x) return p.reject(new TypeError("Promise resolution loop"));

          if (isThenable(x)) {
            x.then(function (y) {
              resolution(p, y);
            }, function (e) {
              p.reject(e);
            });
          } else {
            p.resolve(x);
          }
        } catch (ex) {
          p.reject(ex);
        }
      }

      function _unchained(v) {}

      function thenChain(res, rej) {
        this.resolve = res;
        this.reject = rej;
      }

      function Chained() {}

      ;
      Chained.prototype = {
        resolve: _unchained,
        reject: _unchained,
        then: thenChain
      };

      function then(res, rej) {
        var chain = new Chained();

        try {
          this._resolver(function (value) {
            return isThenable(value) ? value.then(res, rej) : resolution(chain, value, res);
          }, function (ex) {
            resolution(chain, ex, rej);
          });
        } catch (ex) {
          resolution(chain, ex, rej);
        }

        return chain;
      }

      function Thenable(resolver) {
        this._resolver = resolver;
        this.then = then;
      }

      ;

      Thenable.resolve = function (v) {
        return Thenable.isThenable(v) ? v : {
          then: function then(resolve) {
            return resolve(v);
          }
        };
      };

      Thenable.isThenable = isThenable;
      return Thenable;
    }();

    $asyncbind.EagerThenable = $asyncbind.Thenable = ($asyncbind.EagerThenableFactory = function (tick) {
      tick = tick || (typeof process === "undefined" ? "undefined" : _typeof3(process)) === "object" && process.nextTick || typeof setImmediate === "function" && setImmediate || function (f) {
        setTimeout(f, 0);
      };

      var soon = function () {
        var fq = [],
            fqStart = 0,
            bufferSize = 1024;

        function callQueue() {
          while (fq.length - fqStart) {
            try {
              fq[fqStart]();
            } catch (ex) {}

            fq[fqStart++] = undefined;

            if (fqStart === bufferSize) {
              fq.splice(0, bufferSize);
              fqStart = 0;
            }
          }
        }

        return function (fn) {
          fq.push(fn);
          if (fq.length - fqStart === 1) tick(callQueue);
        };
      }();

      function Zousan(func) {
        if (func) {
          var me = this;
          func(function (arg) {
            me.resolve(arg);
          }, function (arg) {
            me.reject(arg);
          });
        }
      }

      Zousan.prototype = {
        resolve: function resolve(value) {
          if (this.state !== undefined) return;
          if (value === this) return this.reject(new TypeError("Attempt to resolve promise with self"));
          var me = this;

          if (value && (typeof value === "function" || _typeof3(value) === "object")) {
            try {
              var first = 0;
              var then = value.then;

              if (typeof then === "function") {
                then.call(value, function (ra) {
                  if (!first++) {
                    me.resolve(ra);
                  }
                }, function (rr) {
                  if (!first++) {
                    me.reject(rr);
                  }
                });
                return;
              }
            } catch (e) {
              if (!first) this.reject(e);
              return;
            }
          }

          this.state = STATE_FULFILLED;
          this.v = value;
          if (me.c) soon(function () {
            for (var n = 0, l = me.c.length; n < l; n++) {
              STATE_FULFILLED(me.c[n], value);
            }
          });
        },
        reject: function reject(reason) {
          if (this.state !== undefined) return;
          this.state = STATE_REJECTED;
          this.v = reason;
          var clients = this.c;
          if (clients) soon(function () {
            for (var n = 0, l = clients.length; n < l; n++) {
              STATE_REJECTED(clients[n], reason);
            }
          });
        },
        then: function then(onF, onR) {
          var p = new Zousan();
          var client = {
            y: onF,
            n: onR,
            p: p
          };

          if (this.state === undefined) {
            if (this.c) this.c.push(client);else this.c = [client];
          } else {
            var s = this.state,
                a = this.v;
            soon(function () {
              s(client, a);
            });
          }

          return p;
        }
      };

      function STATE_FULFILLED(c, arg) {
        if (typeof c.y === "function") {
          try {
            var yret = c.y.call(undefined, arg);
            c.p.resolve(yret);
          } catch (err) {
            c.p.reject(err);
          }
        } else c.p.resolve(arg);
      }

      function STATE_REJECTED(c, reason) {
        if (typeof c.n === "function") {
          try {
            var yret = c.n.call(undefined, reason);
            c.p.resolve(yret);
          } catch (err) {
            c.p.reject(err);
          }
        } else c.p.reject(reason);
      }

      Zousan.resolve = function (val) {
        if (val && val instanceof Zousan) return val;
        var z = new Zousan();
        z.resolve(val);
        return z;
      };

      Zousan.reject = function (err) {
        if (err && err instanceof Zousan) return err;
        var z = new Zousan();
        z.reject(err);
        return z;
      };

      Zousan.version = "2.3.3-nodent";
      return Zousan;
    })();
  }

  function boundThen() {
    return resolver.apply(self, arguments);
  }

  var resolver = this;

  switch (catcher) {
    case true:
      return new $asyncbind.Thenable(boundThen);

    case 0:
      return new $asyncbind.LazyThenable(boundThen);

    case undefined:
      boundThen.then = boundThen;
      return boundThen;

    default:
      return function () {
        try {
          return resolver.apply(self, arguments);
        } catch (ex) {
          return catcher(ex);
        }
      };
  }
};

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

function iterateAsync(_x, _x2, _x3) {
  return _iterateAsync.apply(this, arguments);
}

function _iterateAsync() {
  _iterateAsync = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(target, callback, accumulate) {
    var i, idx, value, key, setKey, res, keys, _i2, _idx2, _value2, _key2, _setKey2, _res2;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!((0, _typeof2["default"])(target) !== 'object')) {
              _context.next = 2;
              break;
            }

            throw new Error('target must be an "object" or an "array"');

          case 2:
            if (!Array.isArray(target)) {
              _context.next = 18;
              break;
            }

            i = 0;

          case 4:
            if (!(i < target.length)) {
              _context.next = 16;
              break;
            }

            idx = i;
            value = target[i];
            key = idx;

            setKey = function setKey(newKey) {
              key = newKey;
            };

            _context.next = 11;
            return callback(value, idx, setKey);

          case 11:
            res = _context.sent;

            if (accumulate) {
              accumulate[key] = res;
            }

          case 13:
            i++;
            _context.next = 4;
            break;

          case 16:
            _context.next = 32;
            break;

          case 18:
            keys = Object.keys(target);
            _i2 = 0;

          case 20:
            if (!(_i2 < keys.length)) {
              _context.next = 32;
              break;
            }

            _idx2 = keys[_i2];
            _value2 = target[_idx2];
            _key2 = _idx2;

            _setKey2 = function _setKey2(newKey) {
              _key2 = newKey;
            };

            _context.next = 27;
            return callback(_value2, _idx2, _setKey2);

          case 27:
            _res2 = _context.sent;

            if (accumulate) {
              if (Array.isArray(accumulate)) {
                accumulate[_i2] = _res2;
              } else {
                accumulate[_key2] = _res2;
              }
            }

          case 29:
            _i2++;
            _context.next = 20;
            break;

          case 32:
            return _context.abrupt("return", accumulate);

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _iterateAsync.apply(this, arguments);
}

var _default = {
  nop: nop,
  iterateSync: iterateSync,
  iterateAsync: iterateAsync
};
exports["default"] = _default;