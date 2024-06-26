const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const url = require('node:url');
const { getMimeSync } = require('./utils/suffix');

const app = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url);
  pathname = pathname === '/' ? '/index.html' : pathname;

  if (pathname !== '/favicon.ico') {
    fs.readFile(`./static${pathname}`, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('这个页面不存在！');
        return;
      };
      // const mime = suffix(url.substring(url.lastIndexOf('.')));
      // 也可以用 path.extname 来获取后缀名
      const mime = getMimeSync(path.extname(pathname));
      res.writeHead(200, { 'Content-Type': `${mime}; charset="utf-8"` });
      res.end(data);
    });
  };
});

const port = 6090;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`app start at ${port}`);
});
