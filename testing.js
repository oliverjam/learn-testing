function equal(x, y, msg = `Expected ${x} and ${y} to be the same`) {
  if (x === y) {
    console.info("✓ " + msg);
  } else {
    console.assert(x === y, msg);
  }
}

function notEqual(x, y, msg = `Expected ${x} and ${y} not to be the same`) {
  if (x !== y) {
    console.info("✓ " + msg);
  } else {
    console.assert(x !== y, msg);
  }
}

function test(name, callback) {
  const assertions = {
    equal,
    notEqual,
  };
  console.log("\n");
  console.group(name);
  callback(assertions);
  console.groupEnd(name);
}
