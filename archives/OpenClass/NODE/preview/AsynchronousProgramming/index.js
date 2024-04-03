function logTime(name) {
  console.log(`Log...${name} : ${new Date().toLocaleDateString()}`);
}

// 回调地狱
function callback() {
  setTimeout(() => {
    logTime('callback 1');
    setTimeout(() => {
      logTime('callback 2');
      setTimeout(() => {
        logTime('callback 3');
        setTimeout(() => {
          logTime('callback 4');
        }, 100);
      }, 100);
    }, 100);
  }, 100);
}

function promise(name, delay = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      logTime(name);
      resolve();
    }, 100);
  });
}

function promiseRes() {
  promise('Promise 1')
    .then(promise('Promise 2')
      .then(promise('Promise 3')));
}

const generator = function* (name) {
  yield promise(name + 1);
  yield promise(name + 2);
  yield promise(name + 3);
};

function co(generator) {
  if (it = generator.next().value) {
    it.then((res) => {
      co(generator);
    });
  } else {

  }
}

const generatorRes = co(generator('Co-Generator-'));

async function asyncAwait() {
  await promise('Async/Await 1');
  await promise('Async/Await 2');
  await promise('Async/Await 3');
  await promise('Async/Await 4');
}

function event() {
  const asyncFun = name => (event) => {
    setTimeout(() => {
      logTime(name);
      event.emit('end');
    }, 100);
    return event;
  };

  const arr = [
    asyncFun('event 1'),
    asyncFun('event 2'),
    asyncFun('event 3'),
  ];

  const { EventEmitter } = require('node:events');
  const event = new EventEmitter();
  let i = 0;
  event.on('end', () => i < arr.length && arr[i++](event));
  event.emit('end');
}

module.exports = { callback, promiseRes, generatorRes, asyncAwait, event };
// exports.callback
