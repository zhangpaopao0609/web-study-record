const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');

const load = (dir, cb) => {
  // 获取绝对路径
  const filePath = path.resolve(__dirname, dir);
  const files = fs.readdirSync(filePath);
  files.forEach(filename => {
    // 去掉后缀
    filename = filename.replace('.js', '');
    // 导入文件
    const file = require(`${filePath}/${filename}`);
    // 处理
    cb(filename, file);
  });
};

const loadModel = config => app => {
  mongoose.connect(config.db.url, config.db.options);
  const connection = mongoose.connection;
  connection.on('error', () => console.error('数据库连接异常！'));
  app.$model = {};
  load('../model', (filename, { schema }) => {
    console.log(`load model: ${filename} ${schema}`);
    app.$model[filename] = mongoose.model(filename, schema);
  });
};

module.exports = loadModel;