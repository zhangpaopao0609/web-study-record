const msg: string = 'Typescript';
// const msg: Array<string> = ['1', '2'];

function sayHello(msg: string): string {
  return `Hello  ${msg}`;
}

document.body.textContent = sayHello(msg);
