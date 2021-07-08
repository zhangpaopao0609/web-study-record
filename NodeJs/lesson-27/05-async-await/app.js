// 利用 async 和 await 来实现一个获取 wwwroot 下的所有目录
const fs = require('fs');
const path = require('path');

const isDir = async path => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if(err) {
        console.log(err);
        reject(err);
        return;
      };
      if(stats.isDirectory()) {
        resolve(true);
      }else {
        resolve(false);
      }
    });
  });
};

const main = dir => {
  fs.readdir(dir, async (err, files) => {
    if(err) {
      console.log(err);
      return;
    };
    const res = [];
    // files.forEach(async item => {
    //   if(await isDir(path.join(dir, item))) {
    //     res.push(item);
    //   };
    // });
    for (let i = 0; i < files.length; i++) {
        if(await isDir(path.join(dir, files[i]))) {
          res.push(files[i]);
        };
    }
    console.log(res);
  });
};

main(path.join(__dirname, 'wwwroot'));