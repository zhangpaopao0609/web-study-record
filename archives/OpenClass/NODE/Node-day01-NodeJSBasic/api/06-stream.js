const fs = require('fs');

const rs = fs.createReadStream('./img/test.jpeg');
const ws = fs.createWriteStream('./img/test_copy.jpeg');
rs.pipe(ws);