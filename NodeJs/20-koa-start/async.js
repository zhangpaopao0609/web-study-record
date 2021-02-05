const setAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 0);
  })
};

const test = async () => {
  console.log(1);
  await setAsync();
  console.log(3);
};

test();