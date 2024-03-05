const KoaRouter = require('koa-router');
const router = new KoaRouter();

const DB = require('../module/db');

// 主页
router.get("/", async ctx => {
  const res = await DB.find("users", {});
  ctx.render("index", { list: res });
});

// 增加用户
router.get("/addUser", async ctx => {
  ctx.render("addUser");
});
// 处理增加用户 然后跳转会主页
router.post("/doAddUser", async ctx => {
  const res = await DB.insert("users", ctx.request.body);
  if(res.result.ok === 1) {
    ctx.redirect("/");
  }else {
    ctx.body = "发生错误！"
  }
});
// 编辑用户
router.get("/editUser/:userid", async ctx => {
  const res = await DB.find("users", {_id: DB.getObjectId(ctx.params.userid)});
  ctx.render("editUser", res[0]);
});
// 处理编辑用户
router.post("/doEditUser/:userid", async ctx => {
  const res = await DB.update("users", {_id: DB.getObjectId(ctx.params.userid)}, ctx.request.body);
  if(res.result.ok === 1) {
    ctx.redirect("/");
  }else {
    ctx.body = "发生错误！"
  };
});


// 处理删除用户   但是用 get 来删除吗？？？
router.get("/deleteUser/:userid", async ctx => {
  const res = await DB.remove("users", {_id: DB.getObjectId(ctx.params.userid)});
  if(res.result.ok === 1) {
    ctx.redirect("/");
  }else {
    ctx.body = "发生错误！"
  };
});

module.exports = router;