# Learn testing in JavaScript

Let's learn about testing by building our own tiny testing library.

## Setup

1. Clone this repo
1. Open `workshop.html` in your editor

There should be a function that squares a number (multiplies it by itself). It's used like this:

```js
const result = square(2);
console.log(result); // 4
```

Right now the only way to check that it works is to manually call the function, then check that the output is what you expect (maybe using a calculator). If you want to check lots of different inputs this becomes a lot of manual work that you have to do every time you want to change the code. It would be nice if you could automate this testing.

## Begin to automate

Since you know how to code you can begin to automate this! Write some JavaScript that calls the `square` function (like above), then checks that the result is what you expect. It should log a useful message to the console using `console.error("my message")` if the result is wrong.

<details>
<summary>Answer</summary>

```js
const result = square(2);
const expected = 500;
if (result !== expected) {
  console.error("Failed: expected square(2) to equal 4, but got " + result);
}
```

If your test passes change your expected value so that it's definitely wrong. Can you see the failure in your browser console?

</details>

## Make it reusable

This is better than manually checking, but not much. We have to write all the same logic for checking whether the values are the same and logging every time.

### `equal`

Write a function called `equal` that takes two arguments and checks if they're equal. If they are it should log the success with `console.info`. If they aren't it should log the failure with `console.error`.

Use this `equal` function to refactor your test above, then write another one to check that `square(3.5)` is correct.

<details>
<summary>Answer</summary>

```js
function equal(x, y) {
  const message = `Expected ${x} to equal ${y}`;
  if (x === y) {
    console.info("Pass: " + message);
  } else {
    console.error("Fail: " + message);
  }
}

const result1 = square(2);
const expected1 = 4;
equal(result1, expected1);

const result2 = square(3.5);
const expected2 = 12.25;
equal(result2, expected2);
```

</details>

If your test is passing change your expected value so that it's definitely wrong. Can you see the error in your browser console?

### `notequal`

Now write a `notEqual` function. It should be similar to `equal`, but log failure when its two arguments _are_ the same.

Write a test that checks `square(3)` does not return 10.

<details>
<summary>Answer</summary>

```js
function notEqual(x, y) {
  const message = `Expected ${x} not to equal ${y}`;
  if (x !== y) {
    console.info("Pass: " + message);
  } else {
    console.error("Fail: " + message);
  }
}

const result = square(3);
const expected = 10;
notEqual(result, expected);
```

</details>

## Separating tests

Right now our tests are all jumbled together. This means they share the same scope, so we can't reuse variable names. It's also hard to distinguish them in the console.

We could divide our tests up using functions, like this:

```js
test("Correctly squares integers", () => {
  const result = square(2);
  const expected = 4;
  equal(result, expected);
});

test("Correctly squares integers", () => {
  const result = square(3.5);
  const expected = 12.25;
  equal(result, expected);
});
```

We call a `test` function with a descriptive name for this specific test, and pass a callback with our actual test code.

Write a function called `test` that takes two arguments: a `name` and a `testFunction`. It should use [`console.group`](https://developer.mozilla.org/en-US/docs/Web/API/Console/group) to log a group labelled with the `name`. You'll need [`console.groupEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupEnd) to close the group at the end.

It should also call the `testFunction` callback argument so that the actual test is run.

<details>
<summary>Answer</summary>

```js
function test(name, testFunction) {
  console.group(name);
  testFunction();
  console.groupEnd();
}

test("Correctly squares integers", () => {
  const result = square(2);
  const expected = 4;
  equal(result, expected);
});

test("Correctly squares decimals", () => {
  const result = square(3.5);
  const expected = 12.25;
  equal(result, expected);
});
```

</details>

![](https://user-images.githubusercontent.com/9408641/74967349-b587b080-5410-11ea-8295-a2f81a8d0f78.png)

## Custom messages

For more complex assertions it's nice to be able to write a custom message so that when the test fails you can see more detail.

Amend your `equal` function so that it takes a third optional `message` argument. Your `console.info`/`console.error` should log this message. If there is no `message` passed in then default to the message you were using before (hint: ES6 default function parameters might be useful here).

<details>
<summary>Answer</summary>

```js
function equal(x, y, message = `Expected ${x} to equal ${y}`) {
  if (x === y) {
    console.info("Pass: " + message);
  } else {
    console.error("Fail: " + message);
  }
}

test("Correctly squares integers", () => {
  const result = square(2);
  const expected = 4;
  equal(result, expected, "square(2) should be 4");
});
```

</details>

## Scoped assertions

Currently our `equal` and `notEqual` assertion functions are global. It would be convenient to pass an object of all assertions in to our callback, so we can access them like this:

```js
test("Correctly squares integers", t => {
  const result = square(2);
  const expected = 4;
  t.equal(result, expected);
});
```

This is useful as it allows each assertion to know the name of the test it was called inside. We won't be using this but "real" testing libraries do in order to keep track of exactly which tests passed and failed. It's good to practice with a realistic API so you're familiar with it when you use a real library.

Move `equal` and `notEqual` inside your `test` function. Then pass an object containing both to the `testFunction` callback. Change your tests to use this object.

<details>
<summary>Answer</summary>

```js
function test(name, testFunction) {
  function equal(x, y, message = `Expected ${x} to equal ${y}`) {
    if (x === y) {
      console.info("Pass: " + message);
    } else {
      console.error("Fail: " + message);
    }
  }

  function notEqual(x, y, message = `Expected ${x} not to equal ${y}`) {
    if (x !== y) {
      console.info("Pass: " + message);
    } else {
      console.error("Fail: " + message);
    }
  }

  const assertions = {
    equal,
    notEqual,
  };

  console.group(name);
  testFunction(assertions);
  console.groupEnd(name);
}

test("Correctly squares integers", t => {
  const result = square(2);
  const expected = 4;
  t.equal(result, expected);
});
```

</details>

## That's it

Congratulations, you've built a testing library from scratch! :sparkles:

We are missing some stuff (support for testing async code, a summary of total passing/failing tests), but we can get pretty far with just this.
