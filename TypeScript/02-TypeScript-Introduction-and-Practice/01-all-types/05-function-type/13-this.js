"use strict";
function foo(baz) {
}
// foo({ bar: 'hello' });
foo.call({ bar: 'hello' }, 0);
