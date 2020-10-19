const { callback, promiseRes } = require('../index.js');

test('callback', done => {
  callback();
  // 延迟一秒结束
  setTimeout(done, 1000);
});

test('promise', done => {
  promiseRes();
  // 延迟一秒结束
  setTimeout(done, 1000);
});