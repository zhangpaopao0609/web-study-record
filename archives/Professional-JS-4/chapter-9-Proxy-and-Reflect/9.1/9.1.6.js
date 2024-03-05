const o = {};

Object.defineProperty(o, 'name', {
    get() { return 'arrow' }
});

const o2 = {};

Object.defineProperty(o2, 'name', {
    value: 'arrow'
});

if(Reflect.defineProperty(o2, 'name', {
    value: 'arrow'
})) {
    console.log('success');
}