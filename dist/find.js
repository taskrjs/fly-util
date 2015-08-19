"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = find;
var marked0$0 = [find].map(_regeneratorRuntime.mark);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _mzFs = require("mz/fs");

var _mzFs2 = _interopRequireDefault(_mzFs);

var _path = require("path");

var _interpret = require("interpret");

var _ = (0, _debug2["default"])("fly:find");
/**
  Find a valid Flyfile from a given path.
  @param {String} file or path to the Flyfile
  @param {Function} use to bind require or process path
  @return {String} path to the Flyfile
*/

function find(path) {
  var bind = arguments.length <= 1 || arguments[1] === undefined ? function (_) {
    return _;
  } : arguments[1];
  var marked1$0, root, resolve;
  return _regeneratorRuntime.wrap(function find$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        resolve = function resolve(root) {
          var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file;

          return _regeneratorRuntime.wrap(function resolve$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                context$2$0.prev = 3;
                _iterator = _getIterator(_regeneratorRuntime.mark(function callee$2$0() {
                  var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, ext, _arr, _i, _name;

                  return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        context$3$0.prev = 3;
                        _iterator2 = _getIterator(_Object$keys(_interpret.jsVariants));

                      case 5:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                          context$3$0.next = 19;
                          break;
                        }

                        ext = _step2.value;
                        _arr = ["Flyfile", "flyfile"];
                        _i = 0;

                      case 9:
                        if (!(_i < _arr.length)) {
                          context$3$0.next = 16;
                          break;
                        }

                        _name = _arr[_i];
                        context$3$0.next = 13;
                        return (0, _path.join)(root, "" + _name + ext);

                      case 13:
                        _i++;
                        context$3$0.next = 9;
                        break;

                      case 16:
                        _iteratorNormalCompletion2 = true;
                        context$3$0.next = 5;
                        break;

                      case 19:
                        context$3$0.next = 25;
                        break;

                      case 21:
                        context$3$0.prev = 21;
                        context$3$0.t0 = context$3$0["catch"](3);
                        _didIteratorError2 = true;
                        _iteratorError2 = context$3$0.t0;

                      case 25:
                        context$3$0.prev = 25;
                        context$3$0.prev = 26;

                        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                          _iterator2["return"]();
                        }

                      case 28:
                        context$3$0.prev = 28;

                        if (!_didIteratorError2) {
                          context$3$0.next = 31;
                          break;
                        }

                        throw _iteratorError2;

                      case 31:
                        return context$3$0.finish(28);

                      case 32:
                        return context$3$0.finish(25);

                      case 33:
                      case "end":
                        return context$3$0.stop();
                    }
                  }, callee$2$0, this, [[3, 21, 25, 33], [26,, 28, 32]]);
                })());

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  context$2$0.next = 19;
                  break;
                }

                file = _step.value;
                context$2$0.prev = 7;
                context$2$0.next = 10;
                return _mzFs2["default"].stat(file);

              case 10:
                if (!context$2$0.sent) {
                  context$2$0.next = 12;
                  break;
                }

                return context$2$0.abrupt("return", file);

              case 12:
                context$2$0.next = 16;
                break;

              case 14:
                context$2$0.prev = 14;
                context$2$0.t0 = context$2$0["catch"](7);

              case 16:
                _iteratorNormalCompletion = true;
                context$2$0.next = 5;
                break;

              case 19:
                context$2$0.next = 25;
                break;

              case 21:
                context$2$0.prev = 21;
                context$2$0.t1 = context$2$0["catch"](3);
                _didIteratorError = true;
                _iteratorError = context$2$0.t1;

              case 25:
                context$2$0.prev = 25;
                context$2$0.prev = 26;

                if (!_iteratorNormalCompletion && _iterator["return"]) {
                  _iterator["return"]();
                }

              case 28:
                context$2$0.prev = 28;

                if (!_didIteratorError) {
                  context$2$0.next = 31;
                  break;
                }

                throw _iteratorError;

              case 31:
                return context$2$0.finish(28);

              case 32:
                return context$2$0.finish(25);

              case 33:
                throw { code: "ENOENT" };

              case 34:
              case "end":
                return context$2$0.stop();
            }
          }, marked1$0[0], this, [[3, 21, 25, 33], [7, 14], [26,, 28, 32]]);
        };

        marked1$0 = [resolve].map(_regeneratorRuntime.mark);

        _("resolve path to flyfile %o", path);
        root = (0, _path.join)(process.cwd(), path);
        context$1$0.next = 6;
        return _mzFs2["default"].stat(path);

      case 6:
        if (!context$1$0.sent.isDirectory()) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 9;
        return resolve(root);

      case 9:
        context$1$0.t0 = context$1$0.sent;
        context$1$0.next = 13;
        break;

      case 12:
        context$1$0.t0 = root;

      case 13:
        context$1$0.t1 = context$1$0.t0;
        return context$1$0.abrupt("return", bind(context$1$0.t1));

      case 15:
      case "end":
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}