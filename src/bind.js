import debug from "debug"
import { jsVariants as js } from "interpret"
const _ = debug("fly:util:bind")
/**
  Register bind to node require to support on the fly compilation.
  @param {String} path to a flyfile
  @return {String} path
*/
export function bind (path) {
  const module = reduce(js[`.${path.split(".").slice(1).join(".") || "js"}`]
  || js[".babel.js"])
  if (module instanceof Function) module({ stage: 0 })
  return path
}

function reduce (m) {
  if (Array.isArray(m)) {
    try {
      const module = m[0].module ? m[0].module : m[0]
      _("register bind %o", module)
      return require(module)
    } catch (_) { return reduce(m.slice(1)) }
  } else return reduce([m])
}
