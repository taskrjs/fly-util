import { flatten } from "./flatten"
/**
  Filter fly-* plugins from a package dependencies.
  Bind require to compile plugins on the fly automatically.
  @param {Object} package.json
  @param {Function} load handler
  @param {[String]} blacklisted plugins
  @param {Boolean} bind require
  @return {[String]} list of fly plugins
*/
export function filter (pkg, load, blacklist = [], bind = true) {
  if (bind) require("babel/register")({
    stage: 0, only: [/fly-[-\w]+\/[-\w]+\./, /[fF]lyfile\.js/]
  })
  return pkg
    ? flatten(["dependencies", "devDependencies", "peerDependencies"]
      .filter((key) => key in pkg)
      .map((dep) => Object.keys(pkg[dep])))
      .filter((dep) => /^fly-[-\w]+/g.test(dep))
      .filter((dep) => !~["fly-util"].concat(blacklist).indexOf(dep))
      .reduce((prev, next) => prev.concat(load(next)), [])
    : []
}
