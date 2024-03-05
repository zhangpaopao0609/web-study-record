(async () => {
  const { MongoClient } = require('mongodb');
  
  // 创建客户端
  const client = new MongoClient(
    'mongodb://134.175.53.155:27017',
    {
      useNewUrlParser: true
    }
  );

  // 创建链接
  const connect = await client.connect();

  const db = client.db('arrow');
  const fruits = db.collection('fruits');
  // 添加文档
  const INSERT_DATA = await fruits.insertOne({
    name: '芒果',
    price: 20.1
  });
  // 查询文档
  const FIND_DATA = await fruits.findOne();
  // 更新文档
  const UPDATE_DATA = await fruits.updateMany({ name: '芒果' }, { $set: { price: 19.9  } });
  // 删除文档
  // const DELETE_DATA = await fruits.deleteMany({ name: '芒果' });
  const DELETE_DATA = await fruits.deleteOne({ name: '芒果' });
  client.close();
})();