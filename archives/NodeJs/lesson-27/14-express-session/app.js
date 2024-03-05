const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'arrow',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 1000*60,
    secure: false 
  }
}));

app.get("/", (req, res) => {
  const { username, age } = req.session;
  if(username || age) {
    res.send(`${username}--${age}--已经登录！`);
  }else {
    res.send("还没登录哟！");
  }
});

app.get("/login", (req, res) => {
  req.session.username = "arrow.bo";
  req.session.age = 20;
  res.send("登录！");
});

app.get("/loginOut", (req, res) => {
  // 1. 这种方式会把所有的 session 都销毁
  // req.session.cookie.maxAge = 0;

  // 2. 将指定的 session 销毁
  // req.session.username = ""

  // 3. destory 销毁所有 session
  // req.session.destroy();
  
  res.send("退出登录！");
});

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});