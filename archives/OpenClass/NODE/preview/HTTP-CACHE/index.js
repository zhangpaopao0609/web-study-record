function updateTime() {
  this.timer = this.timer || setInterval(() => {
    this.time = new Date().toUTCString()
  }, 5000);
  return this.time;
}

const http = require('http');
http.createServer((req, res) => {
  const { url } = req;
  if(url === '/') {
    res.end(`
      <html>
        HTML UPDATE TIME ${updateTime()}
        <script src='./main.js'></script>
      </html>
    `)
  } else if(url === '/main.js') {
    const content = `document.writeln('<br>JS UPDATE TIME: ${updateTime()}')`;
    // 强缓存 
    // 设置 expires
    // res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString()); 
    // 设置 Cache-Control  优先级更高
    // res.setHeader('Cache-Control', 'max-age=20');

    // 协商缓存
    res.setHeader('Cache-Control', 'no-cache');
    // res.setHeader('last-modified', new Date().toUTCString());
    // if(new Date(req.headers['if-modified-since']).getTime() + 3 * 1000 > Date.now()) {
    //   console.log('协商缓存命中======'); 
    //   res.statusCode = 304;
    //   res.end();
    //   return;
    // }

    const crypto =  require('crypto');
    const hash = crypto.createHash('sha1').update(content).digest('hex');
    res.setHeader('Etag', hash);
    if (req.headers['if-none-match'] === hash) {
      console.log('缓存命中======');
      res.statusCode = 304;
      res.end();
      return;
    }

    res.statusCode = 200;
    res.end(content)
  } else if(url === '/favicon.ico') {
    res.end('');
  }
})
  .listen(3000, () => {
    console.log('HTTP Cache Test Run at ' + 3000);
  })