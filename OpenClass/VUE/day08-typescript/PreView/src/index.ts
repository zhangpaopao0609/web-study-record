const msg: string = 'Typescript';
// const msg: Array<string> = ['1', '2'];

const sayHello = (msg:string): string => {
    return `Hello  ${msg}`;
};

document.body.textContent = sayHello(msg);