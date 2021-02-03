const express = require('express');

const app = express();
// 配置静态资源目录
app.use(express.static("static"));
app.set("view engine", "ejs");

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

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});