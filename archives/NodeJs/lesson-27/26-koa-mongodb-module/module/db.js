const { MongoClient, ObjectID } = require('mongodb');
const Config = require('./config');

class DB {
  constructor() {
    this.dbClient = "";
    this.connect();
  }

  static getInstance() {
    if(!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  connect() {
    return new Promise((resolve, reject) => {
      if(this.dbClient) { /* 解决数据库多次连接的问题 */ 
        resolve(this.dbClient);
      }else {
        MongoClient.connect(Config.dbUrl, { useUnifiedTopology: true }, (err, client) => {
          if(err) {
            reject(err);
          }else {
            this.dbClient = client.db(Config.dbName);
            resolve(this.dbClient);
          }
        })
      }
    })
  }

  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        const result = db.collection(collectionName).find(json);
        result.toArray((err, data) => {
          if(err) {
            reject(err);
          }else {
            resolve(data);
          }
        })
      })
    })
  }

  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).insert(json, (err, result) => {
          if(err) {
            reject(err);
          }else {
            resolve(result);
          }
        });
      })
    })
  }

  update(collectionName, query, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).update(query, {$set: json}, (err, result) => {
          if(err) {
            reject(err);
          }else {
            resolve(result);
          }
        });
      })
    })
  }

  remove(collectionName, query) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).remove(query, (err, result) => {
          if(err) {
            reject(err);
          }else {
            resolve(result);
          }
        });
      })
    })
  }

  getObjectId(id) {
    return new ObjectID(id);
  }
};

// const test = new DB();
// console.time("start")
// test.find("orders", {}).then(data => {
//   console.log(data);
// })
// console.timeEnd("start")

// console.time("start1")
// test.find("orders", {}).then(data => {
//   console.log(data);
// })
// console.timeEnd("start1")


// const test_01 = DB.getInstance();
// console.time("start");
// test_01.find("orders", {}).then(data => {
//   console.log(data);
// })
// console.timeEnd("start");

// const test_02 = DB.getInstance();
// console.time("start1");
// test_02.find("orders", {}).then(data => {
//   console.log(data);
// })
// console.timeEnd("start1");

// console.time("start1") 
// test.find("orders", {}).then(data => {
//   console.log(data);
// })
// console.timeEnd("start1")

module.exports = DB.getInstance();