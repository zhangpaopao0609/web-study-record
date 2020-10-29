# DataPersistenceMysql
- 掌握 node.js 中实现持久化的多种方法
- 掌握 mysql 下载、安装和配置
- 掌握 node.js 中 原生 mysql 启动模块的应用
- 掌握 node.js 中 ORM 模块 Sequelize 的应用
- 掌握 Sequelize 的应用案例

# 文件系统数据库
```js
const fs = require('fs');

const get = (key) => {
  fs.readFile('./db.json', (err, data) => {
    const json = JSON.parse(data);
    console.log(json);
    console.log(json[key]);
  });
};

const set = (key, value) => {
  fs.readFile('./db.json', (err, data) => {
    // 判断空文件
    const json = data ? JSON.parse(data) : {};
    json[key] = value;
    // 重新写入文件
    fs.writeFile('./db.json', JSON.stringify(json), err => {
      if (err) {
        console.log(err);
      };
      console.log('写入成功！');
    });
  });
};

// 开发命令行接口
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on('line', (input) => {
  const [ op, key, value ] = input.split(' ');
  if(op === 'get') {
    get(key);
  }else if(op === 'set') {
    set(key, value);
  }else if(op === 'quit') {
    rl.close();
  }else {
    console.log('none!');
  }
});

rl.on('close', () => {
  process.exit(0);
});
```

# node.js 原生驱动
- 安装mysql模块： npm i mysql -S
- mysql 模块基本使用

# Node.js ORM - Seqelize
- 概述： 基于 Promise 的 ORM (Object Realation Mapping), 是一种数据库中间件，支持多种数据库、事务、关联等。
- 安装：npm i sequelize mysql2 -S 
- 基本使用：












