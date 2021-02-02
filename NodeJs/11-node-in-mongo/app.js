const { MongoClient } = require('mongodb');

const url = "mongodb://10.12.6.144:3308";

const dbName = 'arrow';

const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(err => {
  if(err) {
    console.log(err);
    return;
  }; 
  console.log("数据库连接成功！");

  let db = client.db(dbName);
  
  // 查找
  db.collection("users").find({}).toArray((err, data) => {
    if(err) {
      console.log(err);
      return;
    };
    console.log(data);
    // 操作数据库完成过后记得关闭连接
    client.close();
  });

    // // 查找
    // db.collection("users").find({}).toArray((err, data) => {
    //   if(err) {
    //     console.log(err);
    //     return;
    //   };
    //   console.log(data);
    //   // 操作数据库完成过后记得关闭连接
    //   client.close();
    // });

    // 增加
    // db.collection("users").insertOne({"name" : "arrow10", "age" : 10}, (err, res) => {
    //   if(err) {
    //     console.log(err);
    //     return;
    //   };
    //   console.log(res);
    //   // 操作数据库完成过后记得关闭连接
    //   client.close();
    // });

    // 修改
    // db.collection("users").updateOne({age : 10}, {$set: {name: "arrow11", age : 11}}, (err, res) => {
    //   if(err) {
    //     console.log(err);
    //     return;
    //   };
    //   console.log(res);
    //   client.close();
    // });

    // 删除数据
    db.collection("users").deleteOne({age: 11}, (err, res) => {
      if(err) {
        console.log(err);
        return;
      };
      console.log(res);
      client.close();
    })
});