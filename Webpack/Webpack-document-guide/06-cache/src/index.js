import _ from "lodash";
import Print from "./print.js";

function component() {
  const element = document.createElement('div');

  // lodash 在当前 script 中使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.onclick = Print.bind(null, 'Hello Webpack!!');

  return element;
};

document.body.appendChild(component());