const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// 配置静态资源目录
app.use(express.static("static"));  // 内置中间件
app.set("view engine", "ejs");

// 配置三方中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 应用级中间件(可用于权限判断)
app.use((req, res, next) => {
  const now = new Date().toLocaleString();
  console.log(now);
  next();
});

app.get("/", (req, res) => {
  let title = "首页";
  res.render("index", { title });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  // 这是获取传输过来的数据的原生方式，流的方式；
  // let result = "";
  // req.on("data", chunk => {
  //   result += chunk;
  // });
  // req.on("end", () => {
  //   res.send(result);
  // })
  res.send(req.body)
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