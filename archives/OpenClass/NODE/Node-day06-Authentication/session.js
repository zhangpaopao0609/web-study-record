const http = require('node:http');
const { Session } = require('node:inspector');

const session = {};

const app = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.end('');
    return;
  };
  // 观察 cookie
  console.log(req.headers.cookie);

  // 设置 cookie
  const sessionKey = 'arrow';
  const cookie = req.headers.cookie;
  if (cookie && cookie.includes(sessionKey)) {
    res.end('come back');
    const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
    const sid = pattern.exec(cookie)[1];
    console.log('session', sid, session, session[sid]);
  } else {
    const sid = (Math.random() * 99999).toFixed();
    // 设置cookie
    res.setHeader('Set-Cookie', `${sessionKey}=${sid}`);
    session[sid] = { name: 'arrow' };
    res.end('hello!');
  }
});

const port = 6090;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`app start at ${port}`);
});
