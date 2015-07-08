const test = require("tape").test
const Fly = require("../dist")

test("Testing Fly Utilities ~~%", function (t) {
  t.ok(Fly !== undefined, "It's real.")
  t.end()
})
