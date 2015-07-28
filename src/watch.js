import chokidar from "chokidar"
/**
  chokidar.watch wrapper.
  @param {Array:String} globs to watch
  @param {Object} chokidar options
  @return {chokidar.FSWatcher}
*/
export function watch (globs, options) {
  return chokidar.watch(globs, options)
}
