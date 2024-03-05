"use strict";
function identity(arg) {
    return arg;
}
;
const foo = identity('foo');
const barr = identity(true);
function assign(target, source) { }
function assign1(target, source) { }
identity(new Date());
function identity2(x) {
    return x;
}
;
identity2({ x: 1, y: 2 });
function identity3(x) {
    return x;
}
;
identity3(4);
function identity4(x) {
    return { x: 1, y: 1 };
}
;
