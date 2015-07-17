import fs from "mz/fs"
import { join } from "path"
import { jsVariants } from "interpret"

/**
 * Find a Flyfile in path. If path is a directory find the first Flyfile
 * by extension. Flyfiles can be written in any language supported in
 * interpret/jsVariants.
 * @param {String} file or path to the Flyfile
 * @param {[String]} list of alternative Flyfile names
 * @return {String} path to the Flyfile
 */
export function* findPath (path, names = ["Flyfile", "Flypath"]) {
  const root = join(process.cwd(), path)
  return hook(require, (yield fs.stat(path)).isDirectory()
    ? yield resolve(match(
        names.concat(names.map((name) => name.toLowerCase()))
          .map((name) => join(root, name)),
        Object.keys(jsVariants)
      )) : root)
}

/**
 * Hook a require function to allow loading files written in ES6, ES7,
 * CoffeeScript, etc., to be automatically transpiled on the fly.
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
 * @param {[String]} list of files to search
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
 * @param {[String]} list of files
 * @param {[String]} list of extensions
 * @return {Array} Product of matched ${files}${extensions}
 */
function match (files, exts) {
  return files.length === 1
    ? exts.map((ext) => `${files[0]}${ext}`)
    : match([files[0]], exts).concat(match(files.slice(1), exts))
}
