const fs = require('fs');
const url = require('url');
const http = require('http');
const ejs = require('ejs');
const { static } = require('./utils/static');

const app = http.createServer((req, res) => {
  static(req, res, 'static');
  const { pathname } = url.parse(req.url);

  if(pathname === '/login') {
    ejs.renderFile('./views/login.ejs', {msg: 1}, (err, str) => {
      if(err) return;
      res.writeHead(200, {'Content-Type' : 'text/html; charset="utf-8"'});
      res.end(str);
  });
  }else if(pathname === '/doLogin') {
    let query = "";
    req.on("data", chunk => {
      query += chunk;
    });
    req.on('end', () => {
      console.log(query);
      res.writeHead(200, {'Content-Type' : 'text/plain; charset="utf-8"'});
      res.end('收到');
    })

  }else if(pathname === '/register') {
    res.writeHead(200, {'Content-Type' : 'text/plain; charset="utf-8"'});
    res.end('注册！');
  }else {
    res.writeHead(404, {'Content-Type' : 'text/plain; charset="utf-8"'});
    res.end('不存在');
  }
});

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});