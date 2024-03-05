const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// 对应的也可以保存在 redis  mysql 中
// connect-redis  connect-mongo
const app = express();

app.use(session({
  secret: 'arrow',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 1000*60,
    secure: false 
  },
  store: new MongoStore({
    url: 'mongodb://10.12.6.144:3308/users',
})
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
  req.session.destroy();
  res.send("退出登录！");
});

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});