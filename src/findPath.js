import fs from "mz/fs"
import { join } from "path"
import { jsVariants } from "interpret"
/**
  Resolve a valid Flyfile from a path.
  See tkellen/js-interpret for supported extensions.
  @param {String} file or path to the Flyfile
  @return {String} path to the Flyfile
*/
export function* findPath (path) {
  const root = join(process.cwd(), path)
  return (yield fs.stat(path)).isDirectory()
    ? yield resolve(root) : root
  function* resolve (root) {
    for (const file of function* () {
      for (const ext of Object.keys(jsVariants))
        for (const name of ["Flyfile", "flyfile"])
          yield join(root, `${name}${ext}`)
    }()) try { if (yield fs.stat(file)) return file } catch (_) {}
    throw { code: "ENOENT" }
  }
}
