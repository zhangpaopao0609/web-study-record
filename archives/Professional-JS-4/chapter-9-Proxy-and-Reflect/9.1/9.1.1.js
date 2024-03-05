const target = {
    id: 'arrow'
};

const handler = {};

const proxy = new Proxy(target, handler);

console.log(proxy.id);

proxy.id = 'bullet';

console.log(target.id);