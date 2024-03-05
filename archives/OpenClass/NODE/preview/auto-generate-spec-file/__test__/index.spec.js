const fs = require('fs');
const path = require('path');

test('integrate test - test test code and file', () => {
	// 准备环境
	// 删除测试文件夹
	fs.rmdirSync(path.join(__dirname, '/data/__test__'), {
		recursive: true
	})
	const src = new (require('../index.js'))();
	src.genJestSource(path.join(__dirname, '/data'));
})

test('test testCode generation', () => {
  const src = new (require('../index.js'));
  const ret = src.getTestSource('fun', 'class.js');
  console.log('ret', ret);
  expect(ret)
		.toBe(`
			test('TEST fun', () => {
			const fun = require('../class.js');
			const ret = fun();
			//	expect(ret)
			//		.toBe('test return')
			})
			`)
})

test("test filename generation", () => {
  const src = new (require('../index.js'))();
  const ret = src.getTestFileName('/abc/class.js');
  console.log('getTestFileName', ret);
  expect(ret)
    .toBe('/abc/__test__/class.spec.js');
})