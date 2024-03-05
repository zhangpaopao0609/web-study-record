console.log('innerWidth', window.innerWidth);
console.log('innerHeight', window.innerHeight);
console.log('outerWidth', window.outerWidth);
console.log('outerHeight', window.outerHeight);
console.log('clientWidth', document.documentElement.clientWidth);
console.log('clientHeight', document.documentElement.clientHeight);

const btn = document.querySelector('#btn');
btn.onclick = function() {
  window.resizeTo(100, 200)
} 