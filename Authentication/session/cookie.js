// 基于原生的 http 实现一个 cookie - session 
const http = require('http');
const session = {};
const sessionKey = 'arrow'

const app = http.createServer((req, res) => {
  if(req.url === '/favicon.ico') {
    res.end()
  }else {
    console.log(session);

    const cookie = req.headers.cookie;
    if(cookie &&  cookie.indexOf(sessionKey) > -1) {
      const re = new RegExp(`${sessionKey}=([^;]*)`);
      const sessionValue = re.exec(cookie)[1];
      if(session[sessionValue]) {
        res.end(JSON.stringify(session[sessionValue]))
      }else {
        const nowKey = Date.now();
        res.setHeader("Set-Cookie", `${sessionKey}=${nowKey}`);
        session[nowKey] = {
          'name' : 'aa',
          'age' : 12
        }
        res.end("hah")
      }
    }else {
      const nowKey = Date.now();
      res.setHeader("Set-Cookie", `${sessionKey}=${nowKey}`);
      session[nowKey] = {
        'name' : 'aa',
        'age' : 12
      }
      res.end("hah")
    }
  }
});

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});