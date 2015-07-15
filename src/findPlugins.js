import { flatten } from "./flatten"
/**
 * Find `fly-*` plugins listed in package.json dependencies.
 * @param {Object} project's package.json
 * @param {[String]} blacklisted plugins
 * @return {[String]} list of fly deps that can be loaded
 */
export function findPlugins (pkg, blacklist = []) {
  if (!pkg) return []
  return flatten(["dependencies", "devDependencies", "peerDependencies"]
    .filter((key) => key in pkg)
    .map((dep) => Object.keys(pkg[dep])))
    .filter((dep) => /^fly-.+/g.test(dep))
    .filter((dep) => !~blacklist.indexOf(dep))
}
