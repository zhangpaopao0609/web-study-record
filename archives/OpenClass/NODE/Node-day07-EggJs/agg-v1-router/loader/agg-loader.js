const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

// 读取指定文件
function load(dir, cb) {
  // 获取绝对路径
  const url = path.resolve(__dirname, dir);

  // 读文件
  const files = fs.readdirSync(url);

  // 遍历文件夹
  files.forEach(filename => {
    filename = filename.replace('.js', '');
    const file = require(`${url}/${filename}`);
    // 处理逻辑
    cb(filename, file);
  })
};

function initRouter() {
  const router = new Router();
  load('../routes', (filename, routes) => {
    // 路由的前缀
    const prefix = filename === 'index' ? '' : `/${filename}`;

    // 遍历对象
    Object.keys(routes).forEach(key => {
      let [method, path] = key.split(' ');
      path = path === '/' ? '' : path;
      console.log(`正在映射地址： ${method.toLocaleUpperCase()} ${prefix}${path}`);
      router[method](prefix + path, routes[key]);
    });
  });
  return router;
};

module.exports = {
  initRouter
};