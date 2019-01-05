let catchAndReturn = require('./util/catchAndReturn');
let fetchState = require('../src/fetchState');
let test = require('tape-await');

let f = (...args) => fetchState('unitTest', ...args);

test(`fetchState: helloWorld / appName`, t => {
  let st = f('helloWorld');
  t.equal(st.appName, 'unitTest');
});

test(`fetchState: helloWorld / sid`, t => {
  let st = f('helloWorld');
  t.equal(st.sid, 'helloWorld');
});

test(`fetchState: helloWorld / contents`, t => {
  let st = f('helloWorld');
  t.equal(st.hello, 'world');
});

test(`fetchState: olaMundo`, t => {
  let st = f('olaMundo');
  t.equal(st.ola, 'mundo');
});

test(`fetchState: app not found`, t => {
  let err = catchAndReturn(() => {
    fetchState('badApp');
  });

  t.ok(err, `error expected`);
  err && t.equal(err.message, `App not found`);
});

test(`fetchState: session not found`, t => {
  let err = catchAndReturn(() => {
    f('badSession');
  });

  t.ok(err, `error expected`);
  err && t.equal(err.message, `Session not found`);
});

test(`fetchState: new session`, t => {
  let st = f();
  t.ok(typeof st.sid === 'string', `st.sid should be a string`);

  t.deepEqual(Object.keys(st), ['appName', 'sid']);
});
