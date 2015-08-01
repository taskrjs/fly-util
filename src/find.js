import fs from "mz/fs"
import { join } from "path"
import { jsVariants } from "interpret"
/**
  Find a valid Flyfile from a given path.
  See tkellen/js-interpret for supported extensions.
  @param {String} file or path to the Flyfile
  @param {Function} use to bind require or process path
  @return {String} path to the Flyfile
*/
export function* find (path, hook = _ => _) {
  const root = join(process.cwd(), path)
  return hook((yield fs.stat(path))
    .isDirectory() ? yield resolve(root) : root)
  function* resolve (root) {
    for (let file of function* () {
      for (let ext of Object.keys(jsVariants))
        for (let name of ["Flyfile", "flyfile"])
          yield join(root, `${name}${ext}`)
    }()) try { if (yield fs.stat(file)) return file } catch (_) {}
    throw { code: "ENOENT" }
  }
}
