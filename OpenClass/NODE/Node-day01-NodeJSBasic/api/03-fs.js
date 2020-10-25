const fs = require('fs');
const { promisify } = require('util');
// 将readFile方法promise化
const readFile = promisify(fs.readFile);
// promisify readFile
process.nextTick(async () => {
  const data = await readFile('./test.md');
  console.log(data.toString());
})

// 1. 同步读取
// const data = fs.readFileSync('./test.md');
// console.log('data', data.toString());

// 2. 异步读取
// fs.readFile('./test.md', (err, data) => {
//   if (err) throw err;
//   console.log('data:', data.toString());
// })
// console.log(1);