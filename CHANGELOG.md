<div align="center">
  <a href="http://github.com/flyjs/fly">
    <img width=120px  src="https://cloud.githubusercontent.com/assets/8317250/8733685/0be81080-2c40-11e5-98d2-c634f076ccd7.png">
  </a>
</div>

# Changelog

+ [v4.2.0](#v420)
+ [v4.1.0](#v410)
+ [v4.0.1](#v401)
+ [v4.0.0](#v400)
+ [v3.9.1](#v391)
+ [v3.9.0](#v390)
+ [v3.6.0](#v360)
+ [v3.5.0](#v350)
+ [v3.4.3](#v343)
+ [v3.4.2](#v342)
+ [v3.4.1](#v341)
+ [v3.4.0](#v340)
+ [v3.3.0](#v330)
+ [v3.2.0](#v320)
+ [v3.1.0](#v310)
+ [v3.0.0](#v300)
+ [v2.0.0](#v200)
+ [v1.0.0](#v100)

## v4.2.0

+ Remove `dist`

## v4.1.0

+ Stamp wraps [`debug`](https://github.com/visionmedia/debug) if `process.env.DEBUG` is set.

+ Remove `update-notifier` and favor importing directly in Fly.

## v4.0.1

+ Bugfix: Add default `{ stage: 0 }` option to `bind`.

## v4.0.0

+ Change: Remove `watch` and make Fly responsible to setup its own instance of `chokidar`. Users of `fly-util` have no use for `watch`. Compare this against `update-notifier` where users could benefit from using the wrapper inside their own plugins.

+ Change: `filter` does no longer bind require to babel. This should be up to the client, in this case, Fly.

## v3.9.1

+ Improve: Now all logging methods replace the time stamp for a [DEBUG] tag. `debug` already prints the _mtimes_ between logs making the time stamp less useful.

+ Change: Now the default gray stamp is magenta.

## v3.9.0

+ New: Added debug instrumentation to `bind`, `filter` and `find`. Set `DEBUG="*"` env variable to log everything or filter by `fly:[util]:[bind|filter|find]`. See [`debug`](https://github.com/visionmedia/debug) documentation for more info.

+ Change: `loadPlugins` renamed to `filter` which is what the method actually does. `findPath` was renamed to just `find`.

+ Change: `warn` was renamed to `alert` and no longer shows output by default. Set a `VERBOSE` env variable when running fly to enable the output.

+ Change: Remove `fly-util/debug` and favor using alternative debug options like [debug](https://github.com/visionmedia/debug) instead.

## v3.6.0

+ Change: `findPlugins` renamed to `loadPlugins` and added support for plugins written in ES6/7 by default. There is currently no way to opt out, but this may evolve to allow users to avoid this behavior.

+ Maybe: Support for plugins written in other languages, CoffeeScript, EarlGrey, etc., is planned.

+ Add: `hook` function to simplify creating the `require` hook.

+ Change: Simplify `findPath` to 20 LOC. Now, `findPath` does not create a `require` hook, but simply resolves the path to the Flyfile.

+ Change: Dropped support for Flyfiles named `Flypath` or `flypath`. Only, `Flyfile.[extension]` or `flyfile.[extension]`

+ Change: Drop "official" support for node 0.11 in `fly-util` for hacker use. Try 0.12 or iojs if you are _developing_ `fly-util`.

## v3.5.0

+ Bugfix: chokidar `watch` wrapper is now correctly exported and the test suite correctly tests all required exports are defined.

## v3.4.3

+ Silent update. Forgot to include `dist/` in release.

## v3.4.2

+ Update documentation.

## v3.4.1

+ Update with new logo.

  <a href="http://github.com/flyjs/fly">
    <img width=100px  src="https://cloud.githubusercontent.com/assets/8317250/8733685/0be81080-2c40-11e5-98d2-c634f076ccd7.png">
  </a>

## v3.4.0

+ Bugfix: `findPlugins` now correctly skips `fly-util`, itself by default.

## v3.3.0

+ Bugfix: Logging functions should should return `this` after completion.

+ Refactor: Separate utilities into sub modules, improve comments.

+ Refactor: Change `searchPlugins` to `findPlugins`.

+ New: Now you can use the `DEBUG` instead of `DEVELOPMENT` for the same result.

+ New: `debug` function to display the first argument in magenta.

+ New: `warn` logging function.

+ New: `SILENT` env check to supress `warn` output.

## v3.2.0

+ Add `debug` method that produces output only if `process.env.DEVELOPMENT` is truthy.

  > You still may want to remove `this.debug(...)` calls to optimize for production.

  ### Usage

  POSIX shells:
  ```sh
  DEVELOPMENT=true fly
  ```

  Fish:
  ```sh
  env DEVELOPMENT=true fly
  ```

## v3.1.0

+ Support async transformers taking and optional `options` object.

## v3.0.0

+ `log` and `error` print a time stamp.

## v2.0.0

+ `util.expand` behavior was simplified as a result of an internal API change in Fly regarding how async processes are handled. This method no longer requires a callback and simply return a promise that resolves to the expanded files from pattern. Basically it's a promisified version of `glob`.

## v1.0.0

+ [Fly](https://github.com/flyjs/fly) utilities will live in a separate package from now. This should allow plugin authors to import the utilities without having to import all of Fly. Injecting the utilities into the Fly instance itself was another consideration, but also a lack of transparency.

To import the utilities into your plugin:

```js
import util from "fly-util"
```

```js
const util = require("fly-util")
```
