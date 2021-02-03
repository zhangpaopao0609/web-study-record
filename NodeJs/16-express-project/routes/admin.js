const { Router } = require('express');

const router = Router();

// 引入模块
const user = require("./admin/user");
const login = require("./admin/login");
const nav = require("./admin/nav");

router.get("/", (req, res) => {
  res.send("admin");
});

// 挂载路由
router.use("/user", user);
router.use("/login", login);
router.use("/nav", nav);

module.exports = router;