<div align="center">
  <a href="http://github.com/flyjs/fly">
    <img width=120px  src="https://cloud.githubusercontent.com/assets/8317250/8430194/35c6043a-1f6a-11e5-8cbd-af6cc86baa84.png">
  </a>
</div>

# Changelog

+ [v1.0.0](#v100)

## v1.0.0

+ [Fly](https://github.com/flyjs/fly) utilities will live in a separate package from now. This should allow plugin authors to import the utilities without having to import all of Fly. Injecting the utilities into the Fly instance itself was another consideration, but also a lack of transparency.

To import the utilities into your plugin:

```js
import util from "fly-util"
```

```js
const util = require("fly-util")
```
