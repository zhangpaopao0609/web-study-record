const { Router } = require('express');

const router = Router();

router.get("/", (req, res) => {
  res.send("用户登录页面");
});

router.put("/doLogin", (req, res) => {
  res.send("执行登录");
});

module.exports = router;