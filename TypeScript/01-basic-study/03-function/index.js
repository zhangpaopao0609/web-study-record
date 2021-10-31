function run1() {
    return 'run1';
}
;
// 定义方法参数
function getInfo(name, age) {
    return name + "-" + age;
}
;
console.log(getInfo('arrow', 2));
// 可选参数
function optionParameters(name, age) {
    if (age) {
        return "\u59D3\u540D\uFF1A" + name + "---\u5E74\u9F84\uFF1A" + age;
    }
    else {
        return "\u59D3\u540D\uFF1A" + name + "---\u5E74\u9F84\u4FDD\u5BC6";
    }
}
;
console.log(optionParameters('arrow'));
// 可选参数
function defaultParameters(name, age) {
    if (age === void 0) { age = 20; }
    return "\u59D3\u540D\uFF1A" + name + "---\u5E74\u9F84\uFF1A" + age;
}
;
console.log(defaultParameters('arrow', 12));
// 剩余参数
function resetParameters() {
    var res = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        res[_i] = arguments[_i];
    }
    return res.reduce(function (a, b) { return a + b; });
}
;
console.log(resetParameters.apply(void 0, [1, 2, 4, 5]));
console.log(resetParameters(1, 2, 4, 5));
function functionReload(par) {
    if (typeof par === 'string') {
        return "my name is " + par;
    }
    else {
        return "my age is " + par;
    }
}
;
console.log(functionReload(12));
console.log(functionReload('arrow'));