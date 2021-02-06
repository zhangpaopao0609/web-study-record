const { MongoClient } = require('mongodb');
const Config = require('./config');

class DB {
  constructor() {
    this.connect();
  }

  connect() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(Config.dbUrl, (err, client) => {
        if(err) {
          reject(err);
        }else {
          const db = client.db(Config.dbName);
          resolve(db);
        }
      })
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

const test = new DB();
test.find("orders", {}).then(data => {
  console.log(data);
})

