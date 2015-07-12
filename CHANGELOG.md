<div align="center">
  <a href="http://github.com/flyjs/fly">
    <img width=120px  src="https://cloud.githubusercontent.com/assets/8317250/8430194/35c6043a-1f6a-11e5-8cbd-af6cc86baa84.png">
  </a>
</div>

# Changelog

+ [v3.0.0](#v300)
+ [v2.0.0](#v200)
+ [v1.0.0](#v100)

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
