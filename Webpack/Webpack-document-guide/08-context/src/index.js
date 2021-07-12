import _ from "lodash";
import context from "../context-test/index.js";

function component() {
  const element = document.createElement('div');

  // lodash 在当前 script 中使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  console.log(context);
  return element;
}

document.body.appendChild(component());