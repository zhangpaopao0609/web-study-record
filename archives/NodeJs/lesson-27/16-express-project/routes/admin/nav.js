const { Router } = require('express');

const router = Router();

router.get("/", (req, res) => {
  res.send("获取导航列表！");
});

router.get("/add", (req, res) => {
  res.send("增加导航！");
});

router.get("/edit", (req, res) => {
  res.send("修改导航");
});

router.post("/doAdd", (req, res) => {
  res.send("执行增加");
});

router.put("/doEdit", (req, res) => {
  res.send("执行修改");
});

module.exports = router;