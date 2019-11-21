# Learn testing in JavaScript

Imagine you have written a function that squares a number (multiplies it by itself). It's used like this:

```js
const result = square(2);
console.log(result); // 4
```

Right now the only way to check that it works is to manually call the function, then check that the output is what you expect (maybe using a calculator). If you want to check lots of different inputs this becomes a lot of manual work that you have to do every time you want to change the code. It would be nice if you could automate this testing.

## Part one: begin to automate

Since you know how to code you can begin to automate this! Write some JavaScript that calls the `square` function (like above), then checks that the result is what you expect. It should log a useful message to the console using `console.warn("my message")` if the result is wrong.

<details>
<summary>Solution 1</summary>

```js
const result = square(2);
const expected = 4;
if (result !== expected) {
  console.warn("Failed: expected square(2) to equal 4, but got " + result);
}
```

If your test is passing change your expected value so that it's definitely wrong. Can you see the failure in your browser console?

</details>

## Part two: make it reusable

This is better than manually checking, but not much. We have to write all the same logic for checking whether the values are the same and logging every time.

Write a function called `equal` that takes two arguments and checks if they're equal. If they are it should log the success with `console.info`. If they aren't it should log the error with `console.warn`.

Use this `equal` function to refactor your test above, then write another one to check that `square(30)` is correct.

<details>
<summary>Solution 2</summary>

```js
function equal(x, y) {
  if (x === y) {
    console.info(`✓ Expected ${x} to equal ${y}`);
  } else {
    console.warn(`✕ Expected ${x} to equal ${y}`);
  }
}

equal(square(2), 4);
equal(square(30), 10);
```

</details>

If your test is passing change your expected value so that it's definitely wrong. Can you see the error in your browser console?

## Part three: separating tests

Right now our tests are all jumbled together. This means they share the same scope, so we can't reuse variable names. It's also hard to distinguish them in the console. A nice way to split up our tests would be with a function, like this:

```js
test("2 squared should be 4", () => {
  const result = square(2);
  const expected = 4;
  equal(result, expected);
});
```

Write a function called `test` that takes two arguments: a `name` and a `testFunction`. It should use [`console.group`](https://developer.mozilla.org/en-US/docs/Web/API/Console/group) to log a collapsible group labelled with the `name`. You'll need [`console.groupEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupEnd) to close the group at the end. It should also call the `testFunction` argument so that the user's tests are run.

<details>
<summary>Solution 3</summary>

```js
function test(name, testFunction) {
  console.group(name);
  testFunction();
  console.groupEnd();
}

test("2 squared should be 4", () => {
  const result = square(2);
  const expected = 4;
  equal(result, expected);
});
```

</details>

## Part four: custom messages

For more complex assertions it's nice to be able to write a custom message so that when the test fails you can see more detail.

Amend your `equal` function so that it takes a third optional `message` argument. Your `console.info`/`console.warn` should log this message. If there is no `message` passed in then default to the message you were using before (hint: ES6 default function paramenters might be useful here).

<details>
<summary>Solution 4</summary>

```js
function equal(x, y, message = `Expected ${x} to equal ${y}`) {
  if (x === y) {
    console.info("✓ " + message);
  } else {
    console.warn("✕" + message);
  }
}

test("2 squared should be 4", () => {
  const result = square(2);
  const expected = 4;
  equal(result, expected, "2 squared should give us 4");
});
```

</details>

## Part five: scope?

- pass `t` object in to `testFunction` to scope the assertions
