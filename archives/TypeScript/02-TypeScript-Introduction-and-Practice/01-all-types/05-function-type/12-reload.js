"use strict";
function add(x, y) {
    if (typeof x === 'number' && typeof y === 'number') {
        return x + y;
    }
    ;
    if (Array.isArray(x) && Array.isArray(y)) {
        return [...x, ...y];
    }
    ;
}
;
add(1, 2);
add([1], [2]);
