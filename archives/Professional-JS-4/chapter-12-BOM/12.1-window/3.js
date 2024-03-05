console.log(window.screenLeft);
console.log(window.screenTop);

const btn = document.querySelector('#btn');
console.log(btn);
btn.onclick = function() {
  console.log(1);
  window.moveBy(100, 200)
} 