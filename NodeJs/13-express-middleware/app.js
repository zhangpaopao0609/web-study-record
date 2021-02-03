const express = require('express');

const app = express();
// 配置静态资源目录
app.use(express.static("static"));  // 内置中间件
app.set("view engine", "ejs");

// 应用级中间件(可用于权限判断)
app.use((req, res, next) => {
  const now = new Date().toLocaleString();
  console.log(now);
  next();
});

app.get("/", (req, res) => {
  let title = "hello"
  res.render("index", { title })
});

app.get("/news", (req, res) => {
  let msg = {
    name: 'arrow', age: 26
  };
  let hl = "<h1 style='color: red'>hl</h1>"
  res.render("news", {...msg, hl})
});

// 错误级中间件，也就是兜底
app.use((req, res, next) => {
  res.status(404).send("错误！");
});

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});