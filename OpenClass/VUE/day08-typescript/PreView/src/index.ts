const msg: string = 'typescript';
// const msg: Array<string> = ['1', '2'];

const sayHello = (msg:string): string => {
    return `hello${msg}`;
};

document.body.textContent = sayHello(msg);