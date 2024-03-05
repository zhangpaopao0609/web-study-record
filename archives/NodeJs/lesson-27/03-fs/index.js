const fs = require('fs');

// 1. fs.stat 检测文件是目录还是文件

fs.stat('./html', (err, data) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log(`是文件：${data.isFile()}`);
  console.log(`是目录：${data.isDirectory()}`);
});

// 2. fs.mkdir 创建目录
fs.mkdir('./css', err => {
  if(err) {
    console.log(err);
    return;
  };
  console.log('创建成功！');
});

// 3. fs.writeFile 创建写入文件
fs.writeFile('./html/index.html','hellqqq o nodejs', err => {
  if(err) {
    console.log(err);
    return;
  };
  console.log('创建写入文件成功！');
});

// 4. fs.appendFile 追加文件
fs.appendFile('./css/base.css', 'body{color: red11}', err => {
  if(err) {
    console.log(err);
    return;
  };
  console.log('追加文件成功！');
});

//5. fs.readFile 读取文件
fs.readFile('./css/base.css', (err, data) => {
  if(err) {
    console.log(err);
    return;
  };
  console.log(data);
  console.log(data.toString());
})

// 6. fs.readdir 读取目录
fs.readdir('./html', (err, data) => {
  if(err) {
    console.log(err);
    return;
  };
  console.log(data);
});

// 7. fs.rename 重命名 功能 1、重命名 2、移动文件 
fs.rename('./html/index.html', './css/index-new.html', (err) => {
  if(err) {
    console.log(err);
    return;
  };
});

// 8. 删除目录
fs.rmdir('./html', err => {
  if(err) {
    console.log(err);
    return;
  };
})

// 9. 删除文件
fs.unlink('./html/index.html', err => {
  if(err) {
    console.log(err);
    return;
  };
})