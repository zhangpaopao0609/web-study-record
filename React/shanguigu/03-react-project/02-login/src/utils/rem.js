function adapter() {
  // 获取收集横向的设备独立像素
  const dip = document.documentElement.clientWidth;
  // 计算根字体大小(100 是我们自己指定的， 375 是设计稿宽度)
  const rootFontSize = dip / 10;
  // 设置根字体
  document.documentElement.style.fontSize = rootFontSize + 'px';
};

adapter();

window.onresize = adapter;
