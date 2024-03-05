const express = require('express');
const app = express();
const path = require('path');

const mongo = require('./models/db.js');

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
});

app.get('/api/list', async (req, res) => {
  // 分页查询
  const { page, category, keyword } = req.query;

  // 构造查询条件
  const condition = {};
  if(category) {
    condition.category = category;
  }
  if(keyword) {
    condition.name = {$regex: new RegExp(keyword)}
  }
  const collection = mongo.collection('fruits');
  const total = await collection.find(condition).count();
  const fruits = await collection.find(condition)
    .skip((page - 1) * 5)
    .limit(5)
    .toArray();
  res.json({ ok: 1, data: {
    fruits,
    pagination: { total, page }
  } })
});

app.get('/api/category', async (req, res) => {
  const collection = mongo.collection('fruits');
  const category = await collection.distinct('category');
  res.json({ ok: 1, data: category });
})

app.listen(6090, err => {
  if(err) throw err;
  console.log('---服务启动成功---6090---');
})