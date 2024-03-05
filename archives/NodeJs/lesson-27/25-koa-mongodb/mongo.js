console.time("start");
const { MongoClient } = require('mongodb');

const dbUrl = "mongodb://10.12.6.144:3308/"

const dbName = "arrow";

MongoClient.connect(dbUrl, (err, client) => {
  if(err) {
    console.log(err);
    return;
  };

  const db = client.db(dbName);

  const res = db.collection("news").find({});
  res.toArray((err, data) => {
    console.log(data);
    console.timeEnd("start");
    client.close();
  });
})