const co = require("co")
const test = require("tape").test
const util = require("../dist")
const join = require("path").join
const basename = require("path").basename

function asyncFunc (value, handler) {
  setTimeout(() => (handler(undefined, value)), 100)
}

function asyncFuncWithOptions (value, options, handler) {
  setTimeout(() => (handler(undefined, value)), options.time)
}

test("Fly Utility Toolbox ✈", (t) => {
  t.ok(util !== undefined, "it's real")

  Array.prototype.concat([
    "bind", "defer", "expand", "filter", "find", "flatten", "notifyUpdates",
    "watch", "log", "error", "alert", "stamp", "trace"])
  .forEach((prop) => {
    t.ok(util[prop] !== undefined, `${prop} is defined`)
  })

  t.end()
})

test("util.trace (e) ✈", (t) => {
  t.equal(util.trace({ ok: true }), undefined, "does not fail")
  t.end()
})

test("util.defer (asyncFunc) ✈", (t) => {
  util
    .defer(asyncFunc)(42)
    .then((value) => {
      t.equal(value, 42, "promisifies an async func")
      t.end()
    })
})

test("util.defer (asyncFunc /w options) ✈", (t) => {
  util
    .defer(asyncFuncWithOptions)(1985, { time: 100 })
    .then((value) => {
      t.equal(value, 1985, "promisifies an async func w/ options")
      t.end()
    })
})

test("util.flatten (array) ✈", (t) => {
  t.deepEqual(util.flatten([[[1],[2]],[3,4],[[[[5,6]]]],[7],[8]]),
    [1,2,3,4,5,6,7,8], "flattens arrays")
  t.end()
})

test("util.expand (pattern, options) ✈", (t) => {
  const expected = ["a.js", "b.js", "index.js", "Flyfile.js", "flyfile.js", "sample.babel.js"]
  util.expand("./test/**/*.js").then((files) => {
    files.map((file) => basename(file)).forEach((file) => {
      t.ok(!!~expected.indexOf(file), `expands and handles globs: ${file}`)
    })
    t.end()
  }).catch((e) => {
    t.ok(false, e)
  })
})

test("util.find (path) ✈", (t) => {
  co(function* () {
    try {
      t.equal(basename(yield util.find("test/fixtures/Flyfile.js")),
        "Flyfile.js", "find Flyifle given a file")
      t.equal(basename(yield util.find("test/fixtures")),
        "Flyfile.js", "find Flyifle given a path")
    } finally {
      t.end()
    }
  })
})

test("util.bind (module) ✈", (t) => {
  const coffee = require(util.bind(
    join(process.cwd(), "test/fixtures/sample.coffee")))
  t.equal(coffee.getSecret(), 42, "binds to coffee-script")

  const babel = require(util.bind(
    join(process.cwd(), "test/fixtures/sample.babel.js")))
  t.equal(babel.getSecret(), 42, "binds to babel")

  t.end()
})

test("util.filter ({ pkg, regex, blacklist = []}) ✈", (t) => {
  const pkgs = [
    {
      msg: "reads fly-* deps",
      expected: ["fly-a", "fly-b", "fly-c"],
      dependencies: {
        "fly-a": "0.0.0",
        "a": "0.0.0"
      },
      devDependencies: {
        "a": "0.0.0",
        "fly-b": "0.0.0"
      },
      peerDependencies: {
        "x": "0.0.0",
        "fly-c": "0.0.0"
      }
    },
    {
      msg: "skips blacklisted deps",
      expected: ["fly-a", "fly-b", "fly-z"],
      blacklist: ["fly-c", "fly-d"],
      dependencies: {
        "fly-a": "0.0.0",
        "fly-b": "0.0.0",
        "fly-c": "0.0.0",
        "fly-d": "0.0.0"
      },
      devDependencies: {
        "fly-z": "0.0.0",
        "b": "0.0.0"
      }
    },
    {
      msg: "return [] for no fly-* pkg",
      expected: [],
      dependencies: {
        "a": "0.0.0",
        "b": "0.0.0",
        "c": "0.0.0",
        "d": "0.0.0"
      },
      devDependencies: {
        "e": "0.0.0",
        "f": "0.0.0"
      }
    },
    {
      msg: "return [] for no dep pkg",
      expected: [],
      dependencies: {},
      devDependencies: {}
    },
    {
      msg: "skip fly-util by default",
      expected: ["fly-utl", "fly-til", "fly-uti"],
      dependencies: {
        "fly-utl": "0.0.0",
        "fly-til": "0.0.0",
        "fly-uti": "0.0.0",
        "fly-util": "0.0.0"
      },
      devDependencies: {}
    },
  ]
  t.deepEqual(util.filter(undefined), [], "return [] for undefined pkg")
  t.deepEqual(util.filter({}), [], "return [] for empty pkg")

  pkgs.forEach((pkg) => {
    t.deepEqual(util.filter(
      pkg, (_) => _, pkg.blacklist
    ), pkg.expected, pkg.msg)
  })

  t.end()
})
