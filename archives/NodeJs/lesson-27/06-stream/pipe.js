const fs = require('fs');

const read = fs.createReadStream('./data/test.png');
const write = fs.createWriteStream('./data/test_copy.png');

read.pipe(write);