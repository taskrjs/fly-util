/**
  Flatten a nested array recursively.
  @param {Array}
  @return [[a],[b],[c]] -> [a,b,c]
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatten = flatten;

function flatten(array) {
  return array.reduce(function (flat, next) {
    return flat.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}