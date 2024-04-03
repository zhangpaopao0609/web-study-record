// 检查手机是否支持
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', DeviceOrientationHandler, true);
} else {
  alert('您的浏览器不支持DeviceOrientation！');
}

function $(id) {
  return document.getElementById(id);
}

// 获得陀螺仪相关信息
function DeviceOrientationHandler(e) {
  const a = `<p>alpha: ${e.alpha}</p>`;
  const b = `<p>beta: ${e.beta}</p>`;
  const g = `<p>gamma: ${e.gamma}</p>`;
  const abs = `<p>absolute: ${e.absolute}</p>`;
  $('show-info').innerHTML = a + b + g + abs;

  const style = `
    -webkit-transform:rotateX(${e.beta}deg) rotateY(${e.gamma}deg) rotateZ(${e.alpha}deg);
    transform:rotateX(${e.beta}deg) rotateY(${e.gamma}deg) rotateZ(${e.alpha}deg);
  `;
  $('container').setAttribute('style', style);
}
