const logTime = name => {
  console.log(`Log...${name} : ${new Date().toLocaleDateString()}`);
}

// 回调地狱
const callback = () => {
  setTimeout(() => {
    logTime('callback 1');
    setTimeout(() => {
      logTime('callback 2');
      setTimeout(() => {
        logTime('callback 3');
        setTimeout(() => {
          logTime('callback 4');
        },100)
      },100)
    },100)
  },100);
};

const promise = (name, delay = 100) => new Promise(resolve => {
  setTimeout(() => {
    logTime(name);
    resolve();
  }, 100);
})

const promiseRes = () => {
  promise('Promise 1')
    .then(promise('Promise 2')
    .then(promise('Promise 3')))
}

module.exports = { callback, promiseRes };
// exports.callback

