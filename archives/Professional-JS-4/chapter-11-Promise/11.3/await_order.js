async function randomDelay(id) {
  const delay = Math.random() * 1000;
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${id} finished!`);
      resolve(id);
    }, delay);
  })
};

async function foo() {
  const t0 = Date.now();
  const promises = Array(5).fill(null).map((_, index) => randomDelay(index));
  for (const p of promises) {
    const res = await p;
    console.log(`awaited ${res}`);
  }
  console.log(`${Date.now() - t0}ms elapsed!`);
};

foo();