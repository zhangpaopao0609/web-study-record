import _ from "lodash";
import './index.css';
import Suoluo04 from "./suoluo04.jpeg";
import Data from "./data.xml";
import Notes from "./data.csv";
import Toml from "./data.toml";

function component() {
  const element = document.createElement('div');

  // lodash 在当前 script 中使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // 将图像添加到我们已经存在的 div 中
  const mySuoluo = new Image();
  mySuoluo.src = Suoluo04;

  element.appendChild(mySuoluo);

  const span = document.createElement('span');
  span.innerHTML = '&#xe61b;';
  span.classList.add('iconfont');
  element.appendChild(span);

  console.log(Data);
  console.log(Notes);
  console.log(Toml);

  return element;
}

document.body.appendChild(component());