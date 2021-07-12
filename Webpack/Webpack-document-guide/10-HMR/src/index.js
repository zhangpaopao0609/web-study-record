import _ from "lodash";
import printMe from "./print.js";
import './styles.css';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  // lodash 在当前 script 中使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  btn.innerHTML = 'Click me and check the console!!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
};

let element = component();
document.body.appendChild(element);

if(module.hot) {
  module.hot.accept('./print.js', () => {
    console.log('Accept the updated printMe module!!');

    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  });
};
