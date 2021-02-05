const setAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve(4);
    }, 0);
  })
};

const test = async () => {
  console.log(1);
  const four = await setAsync();
  console.log(four);
  console.log(3);
};

test();