import _ from "lodash";

function component() {
  const element = document.createElement('div');
  const button = document.createElement("button");
  const br = document.createElement('br');

  button.innerHTML = 'Cliclk me and look at the console!';
  element.appendChild(br);
  element.appendChild(button);

  button.onclick = e => import(/* webpackChunkName: 'printArdor' */ './print.js').then(module => {
    const print = module.default;
    print();
  });

  return element;
};

document.body.appendChild(component());
