const fs = require('fs');

fs.stat('./html', (err, data) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log(`是文件：${data.isFile()}`);
  console.log(`是目录：${data.isDirectory()}`);
});