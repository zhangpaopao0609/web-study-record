const http = require('http');
const session = {};

const app = http.createServer((req, res) => {
  if(req.url === '/favicon.ico') {
    res.end('');
    return;
  };
  // 观察 cookie
  console.log(req.headers.cookie);

  // 设置 cookie
  res.setHeader('Set-Cookie', 'cookie1=arrow');
  res.end('hello cookie arrow!');
});

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});
