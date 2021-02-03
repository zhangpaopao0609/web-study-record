const express = require('express');

const app = express();

app.get("/", (req, res) => {
  res.send("hi express");
});

app.get("/article", (req, res) => {
  res.send("article");
});

app.get("/login", (req, res) => {
  res.send("login");
});

app.get("/register", (req, res) => {
  res.send("login");
});

app.post("/doLogin", (req, res) => {
  res.send("do login");
});

app.put("/editUser", (req, res) => {
  res.send("修改成功！");
});

app.delete("/deleteUser", (req, res) => {
  res.send("修改成功！");
});

app.get("/article/:id", (req, res) => {
  res.send("动态路由1111： " + req.params["id"]);
})

app.get("/article/:id/a", (req, res) => {
  res.send("动态路由1111A： " + req.params["id"]);
})

app.get("/article/:id/:d", (req, res) => {
  res.send("动态路由22222： " + req.params["id"] + req.params["d"]);
})

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});