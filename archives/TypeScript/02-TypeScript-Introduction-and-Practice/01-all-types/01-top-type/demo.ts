// 顶端类型
function test1(x: any) {
  console.log(x.length);
};

// test1(undefined)

function test2(x: unknown) {
  if (typeof x === 'string') {
    console.log(x.length);
  }
};

test2(undefined)