let catchAndReturn = require('./util/catchAndReturn');
let patchState = require('../src/patchState');
let test = require('tape-await');

let p = (...args) => patchState('unitTest', ...args);

test(`patchState: helloWorld`, t => {
  let st = p('helloWorld', st => ({
    ...st,
    hello: st.hello.toUpperCase(),
  }));

  t.equal(st.hello, 'WORLD');
});

test(`patchState: app not found`, t => {
  let err = catchAndReturn(() => {
    patchState('badApp');
  });

  t.ok(err, `error expected`);
  err && t.equal(err.message, `App not found`);
});

test(`patchState: session not found`, t => {
  let err = catchAndReturn(() => {
    p('badSession');
  });

  t.ok(err, `error expected`);
  err && t.equal(err.message, `Session not found`);
});
