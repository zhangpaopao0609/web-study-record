const mongoose = require('mongoose');

mongoose.connect('mongodb://134.175.53.155', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.on('error', () => console.error('连接失败'));

connection.once('open', async () => {
  const Schema = mongoose.Schema({
    name: String,
    category: String
  });

  const Model = mongoose.model('fruits', Schema);

  let create = await Model.create({
    category: '温带水果',
    name: '苹果'
  });
  console.log(create);
});

