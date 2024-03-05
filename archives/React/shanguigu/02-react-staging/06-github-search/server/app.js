const express = require('express');
const app = express();

app.get('/students', (req, res) => {
  const student = [
    { name: 'ardor', age: 18 },
    { name: 'arrow', age: 22 },
  ];
  res.send(student)
});

app.get('/cars', (req, res) => {
  const cars = [
    { name: 'QQ', age: 18 },
    { name: 'WECHAT', age: 22 },
  ];
  res.send(cars)
});

app.listen(6090, err => {
  if(!err) {
    console.log('服务器启动：6090');
  } else {
    console.log(err);
  };
})