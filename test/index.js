const test = require("tape").test
const util = require("../dist")
const path = require("path")
const go = require("co")

function defined (values) {
  return (values.length === 0)
    ? true
    : (values[0] !== undefined)
      ? defined(values.slice(1))
      : false
}

function instances (object) {
  return Object.keys(object).map(function (key) { return object[key] })
}

function asyncFunc (value, handler) {
  setTimeout(function () {
    handler(undefined, value)
  }, 100)
}


test("Fly utilities test", function (t) {
  t.ok(util !== undefined, "it's real")
  t.ok(defined(instances(util)), "exports are all defined")
  t.end()
})

test("util.trace (e)", function (t) {
  t.equal(util.trace({ ok: true }), undefined, "does not fail")
  t.end()
})


test("util.defer (asyncFunc)", function (t) {
  util
    .defer(asyncFunc)(42)
    .then(function (value) {
      t.equal(value, 42, "promisifies an async func")
      t.end()
    })
})

test("util.flatten (array)", function (t) {
  t.deepEqual(util.flatten([[[1],[2]],[3,4],[[[[5,6]]]],[7],[8]]),
    [1,2,3,4,5,6,7,8], "flattens arrays")
  t.end()
})

test("util.searchPlugins ({ pkg, blacklist = []})", function (t) {
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
  ]

  t.deepEqual(util.searchPlugins(undefined), [], "return [] for undefined pkg")
  t.deepEqual(util.searchPlugins({}), [], "return [] for empty pkg")
  pkgs.forEach((pkg) => {
    t.deepEqual(util.searchPlugins(pkg, pkg.blacklist), pkg.expected, pkg.msg)
  })
  t.end()
})

// util.expand runs `handler` for each of the expanded globs and return
// a promise. this promise resolves to the result of all the handlers
// via Promise.all since it's possible that `handler` return a new
// promise based in the received files/paths
test("util.expand (pattern, handler)", function (t) {
  const expected = ["a.js", "b.js", "index.js", "Flyfile.js", "Flypath.js"]
  util.expand("./test/**/*.js", (_) => _).then((files) => {
    files.map((file) => path.basename(file)).forEach((file) => {
      t.ok(!!~expected.indexOf(file), "expands and handles globs:" + file)
    })
    t.end()
  }).catch((e) => {
    t.ok(false, e)
  })
})


test("*findFlypath (path, names)", function (t) {
  go(function* () {
    t.equal(path.basename(yield util.findFlypath("./test/stub/flyfiles/Flypath/Flypath.js")), "Flypath.js", "return path to flypath if flypath is specified directly")
    t.equal(path.basename(yield util.findFlypath("./test/stub/flyfiles/Flyfile/Flyfile.js")), "Flyfile.js", "return path to flyfile if flyfile is specified directly")
    t.equal(path.basename(yield util.findFlypath("./test/stub/flyfiles/Flyfile/")), "Flyfile.js", "return path to existing Flyfile in directory")
    t.equal(path.basename(yield util.findFlypath("./test/stub/flyfiles/Flypath/")), "Flypath.js", "return path to existing Flypath in directory")
  }).then(_ => t.end()).catch(_ => t.end())
})
