const { MongoClient } = require('mongodb');
const Config = require('./config');

class DB {
  constructor() {
    this.connect();
  }

  static dbClient = "";

  connect() {
    return new Promise((resolve, reject) => {
      console.log(this.dbClient);
      if(this.dbClient) { /* 解决数据库多次连接的问题 */ 
        resolve(this.dbClient);
      }else {
        MongoClient.connect(Config.dbUrl, (err, client) => {
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


const test_01 = new DB();
console.time("start");
test_01.find("orders", {}).then(data => {
  console.log(data);
})
console.timeEnd("start");

const test_02 = new DB();
console.time("start1");
test_02.find("orders", {}).then(data => {
  console.log(data);
})
console.timeEnd("start1");

// console.time("start1") 
// test.find("orders", {}).then(data => {
//   console.log(data);
// })
// console.timeEnd("start1")