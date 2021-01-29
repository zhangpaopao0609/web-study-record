// 1. 判断服务器上面有没有 upload 目录。如果没有则创建这个目录，如果有的话不做操作
const fs = require('fs');
const path = require('path');

const mkdir = dir => {
  fs.mkdir(path.join(__dirname, dir), (err, path) => {
    if(err) {
      console.log(err);
      return;
    };
    console.log(path);
  })
}

fs.stat('./upload', (err, status) => {
  if(err) {
    console.log(err);
    mkdir('upload');
    return;
  };
  if(!status.isDirectory()) {
    // 走到这里说明是一个文件，不是目录，因此先删除文件
    fs.unlink(path.join(__dirname, './upload'), err => {
      if(err) {
        console.log('请检查！');
        return;
      };
      mkdir('upload');
    })
  }
});


// 2. wwwroot 文件夹下面有 images css js 以及 index.html, 找出 wwwroot 目录下面的所有目录，然后把目录放到数组中。
// fs.readdir('./wwwroot', (err, files) => {
//   if(err) {
//     console.log(err);
//     return;
//   };
//   const dir = [];
//   files.forEach(item => {
//     const status =  fs.statSync(path.join(__dirname, 'wwwroot', item))
//     if(status.isDirectory()) dir.push(item);
//   });
//   console.log(dir);
// });

// 这里不仅可以使用同步实现，也可以采用递归以及 async await 实现
fs.readdir('./wwwroot', (err, files) => {
  if(err) {
    console.log(err);
    return;
  };
  const dir = [];

  (function getDir(i) {
    if(i === files.length) {
      console.log(dir); 
      return;
    }
    fs.stat(path.join(__dirname, 'wwwroot', files[i]), (err, status) => {
      if(status.isDirectory()) {
        dir.push(files[i]);
      };
      getDir(i+1);
    });
  })(0)


  // files.forEach(item => {
  //   const status =  fs.statSync(path.join(__dirname, 'wwwroot', item))
  //   if(status.isDirectory()) dir.push(item);
  // });
});
