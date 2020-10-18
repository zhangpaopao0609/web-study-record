test("test filename generation", () => {
  const src = new (require('../index.js'))();
  const ret = src.getTestFileName('/abc/class.js');
  console.log('getTestFileName', ret);
  expect(ret)
    .toBe('/abc/__test__/class.spec.js');
})