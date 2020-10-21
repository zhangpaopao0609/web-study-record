function updateTime() {
  setInterval(() => {
    this.time = new Date().toUTCString()
  }, 1000);
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
    res.statusCode = 200;
    res.end(content)
  } else if(url === '/favicon.ico') {
    res.end('');
  }
})
  .listen(3000, () => {
    console.log('HTTP Cache Test Run at ' + 3000);
  })