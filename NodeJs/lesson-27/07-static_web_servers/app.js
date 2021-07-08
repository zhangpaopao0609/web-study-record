const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
  let { url } = req;
  url = url === '/' ? '/index.html' : url;
  
  if(url !== '/favicon.ico') {
    fs.readFile('./static' + url, (err, data) => {
      if(err) {
        res.writeHead(404);
        res.end('这个页面不存在！');
        return;
      };
      res.writeHead(200, {'Content-Type' : 'text/html; charset="utf-8"'});
      res.end(data);
    }); 
  };
});

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});