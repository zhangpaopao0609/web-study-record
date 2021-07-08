const fs = require('fs');

let str = '';
for (let i = 0; i < 500; i++) {
  str += 'hello world 1 \r'
}

const stream = fs.createWriteStream('./data/hello.txt');

stream.write(str);

stream.end();

stream.on('finish', () => {
  console.log('over');
})
