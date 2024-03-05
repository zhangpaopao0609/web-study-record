self.postMessage('fpp');
self.close();
self.postMessage('arr');

setTimeout(() => {
  self.postMessage('aa')
}, 0);