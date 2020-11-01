# Node-day05-DataPersistence-Mongodb
- 掌握 mongodb 基本使用
- 理解文档型数据库设计理念
- 掌握原生模块 node-mongodb-native 应用
- 掌握ODM 模块 mongoose 应用
- 理解快速开发工具 KeyStoneJS

LAMP 或 LNMP (Linux Nginx Mysql PHP) 与 MEAN (Mongo DB, Express, Angular.js, Node.js)

# docker-compose.yml
```yml
version: '2.0'
services:
  mongo:
    image: mongo
    restart: always
    ports:
      - 27017:27017
  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 60900:8081
```

docker 中直接 mongo 进入 mongo DB

# 利用事件订阅和发布方式处理异步  mongo连接完成才后进行插入等操作

在这里订阅一个事件（一次性事件），订阅也就是监听了一个事件

```js
const mongodb = require('./models/db.js');

mongodb.once('connect', async () => {
  const collection = mongodb.collection('fruits');
  // 首先删除已存在的数据
  await collection.deleteMany();
  // 生成100条数据
  const data = new Array(100).fill().map((item, index) => {
    return {
      name: `梨子${index}`,
      price: index,
      category: Math.random() > 0.5 ? 'vegetable' : 'fruit'
    }
  });
  // 插入数据
  await collection.insertMany(data);
  console.log('插入成功！');
})
```

当数据库连接完成后发布一个事件， 发布其实就是触发一个事件
```js
// 数据库连接与与业务解耦
// 订阅  
const conf = require('./config.js');
const { EventEmitter } = require('events');

// 客户端
const { MongoClient } = require('mongodb');

class Mongodb {
  constructor(conf) {
    // 保存conf
    this.conf = conf;
    this.emitter = new EventEmitter();
    // 连接
    this.client = new MongoClient(conf.url, { useNewUrlParser: true });
    this.client.connect(err => {
      if (err) throw err;
      console.log('连接成功！');
      // 事件发布
      this.emitter.emit('connect');
    });
  }
  /**
   * 返回集合
   */
  collection(collectionName, dbName = this.conf.dbName) {
    return this.client.db(dbName).collection(collectionName);
  }
  /**
   * 用于订阅连接事件
   * @param {*} event 
   * @param {*} db 
   */
  // 事件订阅
  once(event, cb) {
    this.emitter.once(event, cb);
  }
};

module.exports = new Mongodb(conf);
```

# Mongoose
1. 提供模型， 需要明确的定义模型
2. 



关系型数据库
DB  -》 E-R  -》 实体参照模型  -》 后端  -》 前端

