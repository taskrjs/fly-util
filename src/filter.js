import debug from "debug"
import { flatten } from "./flatten"
const _ = debug("fly:util:filter")
/**
  Filter fly-* plugins from a package dependencies.
  Bind require to compile plugins on the fly automatically.
  @param {Object} package.json
  @param {Function} load handler
  @param {[String]} blacklisted plugins
  @param {Boolean} module
  @return {[String]} list of fly plugins
*/
export function filter (pkg, load, blacklist = [], bind = "babel-core/register") {
  if (bind) {
    _("register bind %o", bind)
    require(bind)({
      stage: 0, only: [/fly-[-\w]+\/[-\w]+\./, /[fF]lyfile\.js/]
    })
  }
  _("filter fly-* from dependencies")
  return pkg
    ? flatten(["dependencies", "devDependencies", "peerDependencies"]
      .filter((key) => key in pkg)
      .map((dep) => Object.keys(pkg[dep])))
      .filter((dep) => /^fly-[-\w]+/g.test(dep))
      .filter((dep) => !~["fly-util"].concat(blacklist).indexOf(dep))
      .reduce((prev, next) => prev.concat(load(next)), [])
    : []
}
