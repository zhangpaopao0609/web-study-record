"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Base_d;
class Base {
    constructor() {
        this.a = '';
        this.b = '';
        this.c = '';
        _Base_d.set(this, '');
    }
    a2() {
        return __classPrivateFieldGet(this, _Base_d, "f");
    }
}
_Base_d = new WeakMap();
class Derived extends Base {
    a1() {
        console.log(this.b);
        return this.a;
    }
}
;
const derived = new Derived();
derived.a;
derived.a1();
