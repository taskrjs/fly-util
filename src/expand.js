import glob from "glob"
/**
 * Promisified glob wrapper.
 * @param {String} pattern to match
 * @param {Object} options
 * @return {Promise}
 */
export function expand (pattern, options) {
  return new Promise(function (resolve, reject) {
    glob(pattern, options, (er, files) =>
      er ? reject(er) : resolve(files))
  })
}
