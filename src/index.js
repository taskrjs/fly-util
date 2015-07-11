import fs from "mz/fs"
import clor from "clor"
import glob from "glob"
import pretty from "prettyjson"
import chokidar from "chokidar"
import { join } from "path"
import { jsVariants } from "interpret"
import updateNotifier from "update-notifier"

export const log = console.log.bind(console)
export const error = console.error.bind(console)

/**
 * Wrapper for prettyjson and other stack tracing improvements.
 * @param {Object} error object
 */
export function trace (e) {
  error(pretty.render(e)
    .replace(/(\sFunction|\sObject)\./g, `${clor.blue("$1")}.`)
    .replace(/\((~?\/.*)\)/g, `(${clor.gray("$1")})`)
    .replace(/:([0-9]*):([0-9]*)/g, ` ${clor.yellow("$1")}:${clor.yellow("$2")}`)
    .replace(new RegExp(process.env.HOME, "g"), "~")
  )
}

/**
 * Promisify an async function.
 * @param {Function} async function to promisify
 * @return {Function} function that returns a promise
 */
export function defer (asyncFunc) {
  return (value) => new Promise((resolve, reject) =>
    asyncFunc(value, (err, value) => err ? reject(err) : resolve(value)))
}

/**
 * Flatten a nested array recursively.
 * @return [[a],[b],[c]] -> [a,b,c]
 */
export function flatten (array) {
  return array.reduce((flat, next) =>
    flat.concat(Array.isArray(next) ? flatten(next) : next), [])
}

/**
 * Search `fly-*` plugins listed in package.json dependencies.
 * @param {Package} project's package.json
 * @param {Array} blacklisted plugins
 * @return {Array} list of loadable fly deps
 */
export function searchPlugins (pkg, blacklist = []) {
  if (!pkg) return []
  return flatten(["dependencies", "devDependencies", "peerDependencies"]
    .filter((key) => key in pkg)
    .map((dep) => Object.keys(pkg[dep])))
    .filter((dep) => /^fly-.+/g.test(dep))
    .filter((dep) => !~blacklist.indexOf(dep))
}

/**
 * Return a promise that resolves to the expanded files from pattern.
 * @param pattern {String} Pattern to be matched
 * @param handler {Function} Function to run for each unwrapped glob promise.
 * @return {Promise}
 */
export function expand (pattern, options) {
  return new Promise(function (resolve, reject) {
    glob(pattern, options, function (er, files) {
      return er ? reject(er) : resolve(files)
    })
  })
}

/**
 * Wrapper for chokidar.watch. Array of globs are flattened.
 * @param {Array:String} globs to watch
 * @param {Object} chokidar options
 * @return {chokidar.FSWatcher}
 */
export function watch (globs, options) {
  return chokidar.watch(flatten([globs]), options)
}

/**
 * Wrap update-notifier notify.
 * @param {Array} options
 */
export function notifyUpdates (options) {
  updateNotifier(options).notify()
}

/**
 * Resolve the Flyfile path. Check the file extension and attempt to load
 * every possible JavaScript variant if file is a directory.
 * @param String file or path to the Flyfile
 * @param String:Array Flyfile variant name
 * @return {String} path to the Flyfile
 */
export function* findFlypath (path, names = ["Flyfile", "Flypath"]) {
  const root = join(process.cwd(), path)
  return hook(require, (yield fs.stat(path)).isDirectory()
    ? yield resolve(match(
        names.concat(names.map((name) => name.toLowerCase()))
          .map((name) => join(root, name)),
        Object.keys(jsVariants)
      ))
    : root)
  /**
   * Add require hook so that subsequent calls to require transform the
   * JavaScript source variant (ES7, CoffeeScript, etc.) in the fly.
   * @param {Function} require function to load selected module
   * @param {String} path to Flyfile
   * @return {String} path to Flyfile
   */
  function hook (require, path) {
    const js = jsVariants[`.${path.split(".").slice(1).join(".") || "js"}`]
    if (Array.isArray(js)) {
      (function reduce (modules) {
        if (modules.length === 0) return
        try {
          require(modules[0].module
            ? modules[0].module
            : modules[0])({ stage: 0 })
        } catch (_) { reduce(modules.slice(1)) }
      }(js))
    } else if (js) { require(js) }
    return path
  }

  /**
   * Find the first existing file in files.
   * @param {Array:String} list of files to search
   * @return {String} path of an existing file
   */
  function* resolve (files) {
    if (files.length === 0) throw { code: "ENOENT" }
    try {
      if (yield fs.stat(files[0])) return files[0]
    } catch (e) { return yield resolve(files.slice(1)) }
  }

  /**
   * Match files and extensions.
   * @param {Array:String} List of files to match
   * @param {Array:String} List of extensions to match
   * @return {Array} Product of matched files * extensions
   */
  function match (files, exts) {
    return files.length === 1
      ? exts.map((ext) => `${files[0]}${ext}`)
      : match([files[0]], exts).concat(match(files.slice(1), exts))
  }
}
