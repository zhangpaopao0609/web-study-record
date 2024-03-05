const { json } = require('express');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/test1', (req, res) => {
  console.log('有人请求 test 1');
  res.send({ code: 200, data: {}, message: 'test1' });
});

app.get('/test2', (req, res) => {
  console.log('有人请求 test 2', req.query);
  res.send({
    code: 200,
    data: { query: req.query },
    message: 'test2' 
  });
});

app.get('/test3/:name/:age', (req, res) => {
  console.log('有人请求 test 3', req.params);
  res.send({
    code: 200,
    data: { parmas: req.params },
    message: 'test3' 
  });
});

app.post('/test4', (req, res) => {
  console.log('有人请求 test 4', req.query);
  res.send({
    code: 200,
    data: { query: req.query },
    message: 'test4' 
  });
});

app.post('/test5/:name/:age', (req, res) => {
  console.log('有人请求 test5', req.params);
  res.send({
    code: 200,
    data: { parmas: req.params },
    message: 'test5' 
  });
});

app.post('/test6', (req, res) => {
  console.log('有人请求 test6', req.body);
  res.send({
    code: 200,
    data: { data: req.body },
    message: 'test6' 
  });
});

app.put('/test7/:name/:age', (req, res) => {
  console.log('有人请求 test7', req.body, req.query);
  res.send({
    code: 200,
    data: { 
      body: req.body,
      query: req.query,
    },
    message: 'test7' 
  });
});

app.listen(6090, err => {
  if(!err) {
    console.log('服务器开启在： 6090');
  }
});