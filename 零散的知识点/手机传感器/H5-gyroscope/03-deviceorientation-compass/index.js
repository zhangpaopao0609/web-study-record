// 通过陀螺仪检测手机当前静止参数
window.addEventListener(
  "deviceorientation",
  (e) => {
    const a = e.alpha;
    const b = e.beta;
    const g = e.gamma;
    let head = e.webkitCompassHeading;
    head = head ? head : a; //兼容处理, ios系统的手机head角是正北角度; android不支持此属性,使用 a 角度合适

    $("compass__box").style.cssText = `
      -webkit-transform:rotateZ(${head}deg);
      transform:rotateZ(${head}deg);
    `;

    $("cur__degree").innerHTML = `${Math.round(head)}°`;

    // 获得指北针数字
    wheelText({ head: head || a, id: "scale__number" });
    // 指北针方向文字
    wheelText({ head: head || a, id: "scale__text" });
    // 水平圆盘
    $("fixed__disc").style.cssText = `
      -webkit-transform:translate(${-g}px, ${-b}px);
      transform:translate(${-g}px, ${-b}px);
    `;
    $("box__text").innerHTML = `<p>g：${-g} </p><p>b：${-b} </p>`;
  },
  true
);
// 生成主刻线
createItem({ id: "reticle__main", max: 2 });
// 生成次刻线
createItem({ id: "reticle__second", max: 30 });
// 指北针文字
createItemText({ id: "scale__number", max: 12 });
// 方向文字
createItemText({
  id: "scale__text",
  max: 4,
  textBoo: true,
  textArr: ["北", "东", "南", "西"],
});

// 指北针数字文字跟随转动
function wheelText(data) {
  const len = $(data.id).getElementsByTagName("div").length;
  for (let i = 0; i < len; i++) {
    const oSpan = $(data.id)
      .getElementsByTagName("div")
      [i].getElementsByTagName("span")[0];
    oSpan.style.cssText = `
      -webkit-transform:rotate(${-i * (360 / len) + data.head}deg);
      transform:rotate(${-i * (360 / len) + data.head}deg);
    `;
  }
}

function createItemText(data) {
  let rtn = "";
  let inner = "";
  for (let i = 0; i < data.max; i++) {
    if (data.textBoo) {
      inner =
        '<span class="text" style="-webkit-transform:rotate(' +
        -i * 90 +
        "deg);transform:rotate(" +
        -i * 90 +
        'deg);">' +
        data.textArr[i] +
        "</span>";
    } else {
      inner =
        '<span class="text" style="-webkit-transform:rotate(' +
        -i * 30 +
        "deg);transform:rotate(" +
        -i * 30 +
        'deg);">' +
        i * 30 +
        "</span>";
    }
    rtn +=
      '<div class="item" style="-webkit-transform:rotateZ(' +
      (360 / data.max) * i +
      "deg);transform:rotateZ(" +
      (360 / data.max) * i +
      'deg);">' +
      inner +
      "</div>";
  }
  $(data.id).innerHTML = rtn;
}

function createItem(data) {
  let rtn = "";
  for (let i = 0; i < data.max; i++) {
    rtn +=
      '<div class="item" style="-webkit-transform:rotateZ(' +
      (180 / data.max) * i +
      "deg);transform:rotateZ(" +
      (180 / data.max) * i +
      'deg);"></div>';
  }
  $(data.id).innerHTML = rtn;
}

function $(id) {
  return document.getElementById(id);
}
