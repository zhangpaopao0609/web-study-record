const mongodb = require('./models/db.js');

mongodb.once('connect', async () => {
  const collection = mongodb.collection('fruits');
  // 首先删除已存在的数据
  await collection.deleteMany();
  // 生成100条数据
  const data = new Array(200).fill().map((item, index) => {
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