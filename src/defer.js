/**
 * Promisify a function with a callback.
 * @param {Function} async function of the form (value, options, cb)
 * @return {Function} new function that returns a promise
 */
export function defer (asyncFunc) {
  return (value, options) => new Promise((resolve, reject) => {
    const cb = (err, value) => err ? reject(err) : resolve(value)
    asyncFunc(value, options || cb, options && cb)
  })
}
