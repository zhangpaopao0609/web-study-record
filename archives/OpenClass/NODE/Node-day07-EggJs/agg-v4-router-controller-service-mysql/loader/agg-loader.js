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

function initRouter(app) {
  const router = new Router();
  load('../routes', (filename, routes) => {
    // 路由的前缀
    const prefix = filename === 'index' ? '' : `/${filename}`;
    routes = routes instanceof Function ? routes(app) : routes; 
    // 遍历对象
    Object.keys(routes).forEach(key => {
      let [method, path] = key.split(' ');
      path = path === '/' ? '' : path;
      console.log(`正在映射地址： ${method.toLocaleUpperCase()} ${prefix}${path}`);
      router[method](prefix + path, async ctx => {
        // 挂载上下文到 app
        app.ctx = ctx; 
        // 路由处理接收 app
        await routes[key](app);
      })
    });
  });
  return router;
};

function initController(app) {
  const controllers = {};
  // 读取ctrl
  load('../controller', (filename, controller) => {
    controllers[filename] = controller(app);
  });
  return controllers;
}

function initService() {
  const services = {};
  // 读取ctrl
  load('../service', (filename, service) => {
    services[filename] = service;
  });
  return services;
};

function loadConfig(app) {
  const Sequelize = require('sequelize');
  load('../config', (filename, conf) => {
    if(conf.db) {
      app.$db = new Sequelize(conf.db);
      // 加载模型
      app.$model = {};
      load('../model', (filename, { schema, options }) => {
        app.$model[filename] = app.$db.define(filename, schema, options);
      });
      app.$db.sync();
    }
  })
}

module.exports = {
  initRouter,
  initController,
  initService,
  loadConfig
};