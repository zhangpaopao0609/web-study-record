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
      console.log('---mongo---连接成功---');
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