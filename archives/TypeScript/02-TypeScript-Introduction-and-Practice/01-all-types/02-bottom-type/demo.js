"use strict";
// 尾端类型
function throwError() {
    throw new Error();
}
;
function fail() {
    return throwError();
}
function infiniteLoop() {
    while (true) {
        console.log('endless...');
    }
}
