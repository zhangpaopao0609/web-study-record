// 专门用来测试的

/**
 * 
 * @param {*} title 测试的名字
 * @param {*} fn 测试的函数
 */
const test = (title, fn) => {
  try {
    fn();
    console.log(title, '测试通过');
  } catch (error) {
    console.error(error);
    console.error(title, '测试失败');
  }
}

const expect = (ret) => {
  return {
    toBe(arg) {
      if(ret !== arg) {
        throw Error(`预期和实际不符，预期是${arg}, 实际的结果是${ret}`)
      }
    }
  }
}

//  测试代码帮你整理逻辑，可以随时执行
//  1. git pre commit 执行
//  2. 云平台每次 push 会执行
test('测试数字相加:', () => {
  expect(add(1, 3)).toBe(4);
});

// TDD 先写测试
// 报错后再去写代码
test('测试数字跟字符串相加:', () => {
  expect(add(1, "4")).toBe(5);
});

test('测试字符串跟字符串相加:', () => {
  expect(add("a", "b")).toBe("ab");
});