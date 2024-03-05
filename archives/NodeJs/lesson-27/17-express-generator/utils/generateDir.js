const fs = require('fs');
const { join } = require('path');

const generateDir = (path, cb) => {
  path = join(__dirname, "..", path);
  fs.stat(path, (err, stats) => {
    if(err || stats.isFile()) {
      // 说明没有这个目录,那么就生成这个目录
      fs.mkdir(path, err => {
        if(err) {
          throw err;
        };
        cb && cb();
      })
    };
  })
};

module.exports = generateDir;