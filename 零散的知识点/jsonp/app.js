const http = require('http');
const url = require('url');

const app = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  if(pathname === '/') {    
    // 首先通过query获取到jsonp 的函数名
    const { callback } = query;
    // 然后通过 callback 将想要跨域传输的数据包裹在其中，然后将 callback 一起返回给前端
    const data = 'arrow';
    res.setHeader("Content-Type", "application/javascript")
    res.end(`${callback}('${data}')`);
  }
});

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});