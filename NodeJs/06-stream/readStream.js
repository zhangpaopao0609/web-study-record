const fs = require('fs');

let count = 0;

const create = fs.createReadStream('./data/hello.txt');

create.on('data', data => {
  count++;
});

create.on('end', () => {
  console.log(count);
});
