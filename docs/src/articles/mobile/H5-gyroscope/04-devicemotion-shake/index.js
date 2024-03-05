navigator.vibrate =
  navigator.vibrate ||
  navigator.webkitVibrate ||
  navigator.mozVibrate ||
  navigator.msVibrate; // 震动

function gotoShake() {
  const threshold = 10;
  let xBefore = 0; // 记录上一次 x 轴方向的加速度
  let yBefore = 0; // 记录上一次 y 轴方向的加速度
  let zBefore = 0; // 记录上一次 z 轴方向的加速度

  function handleShake(devicemotionEvent) {
    const { x, y, z } = devicemotionEvent.acceleration; // 当前 x y z 轴的加速度
    const inX = Math.abs(x - xBefore); // 本次加速度与上一次加速度差值
    const inY = Math.abs(y - yBefore);
    const inZ = Math.abs(z - zBefore);
    xBefore = x;
    yBefore = y;
    zBefore = z;
    const isShaking = inX > threshold || inY > threshold || inZ > threshold; // 只要有一个差值超过阈值，则说明正在摇一摇
    if (isShaking) {
      handleShaking(); // 调用摇动处理函数
      startVibrate(); // 调起手机震动
    } else {
      handleStop();
    }
  }

  window.addEventListener("devicemotion", throttle(handleShake, 200), true);
}

// 节流函数 每隔一段时间要执行一次
function throttle(fn, interval) {
  let yet = false;
  return (...args) =>  {
    if (!yet) {
      setTimeout(() => {
        fn.call(this, ...args);
        yet = false;
      }, interval);
      yet = true;
    }
  };
}

const shakeImg = document.querySelector(".shake-img");

function handleShaking() {
  shakeImg.setAttribute("class", "shake-img animate__animated animate__tada");
  setTimeout(() => {
    shakeImg.setAttribute("class", "shake-img");
  }, 200);
}

function startVibrate(duration = 200) {
  if (navigator.vibrate) navigator.vibrate(duration);
}

function handleStop() {
  console.log(2);
}

// 开启使用陀螺仪
(function permission() {
  if (location.protocol != "https:") {
    location.href =
      "https:" +
      window.location.href.substring(window.location.protocol.length);
  }
  if (isIosOrAndroid === 2) {
    // 仅 ios 需要获取用户允许
    if (
      typeof window.DeviceMotionEvent !== "undefined" &&
      typeof window.DeviceMotionEvent.requestPermission === "function"
    ) {
      window.DeviceMotionEvent.requestPermission()
        .then((response) => {
          if (response == "granted") {
            gotoShake();
          }
        })
        .catch(console.error);
    } else {
      alert("DeviceMotionEvent is not defined");
    }
  } else {
    gotoShake();
  }
})();

function isIosOrAndroid() {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
  if (isAndroid) {
    return 1;
  }
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isiOS) {
    return 2;
  }
  return 0;
}
