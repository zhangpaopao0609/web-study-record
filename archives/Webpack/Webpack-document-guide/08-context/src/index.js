import _ from "lodash";
import b from "../context-test/index";
import { a } from "../context-test/index-old";

function component() {
  const element = document.createElement('div');

  // lodash 在当前 script 中使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
};

console.log(b, a);

document.body.appendChild(component());
