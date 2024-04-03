function setAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve(4);
    }, 0);
  });
}

async function test() {
  console.log(1);
  const four = await setAsync();
  console.log(four);
  console.log(3);
}

test();
