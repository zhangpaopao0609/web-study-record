module.exports = app => ({
  index: async ctx => {
    const name = await app.$service.user.getName();
    app.ctx.body = `user ctrl ${name}`
  },
  detail: ctx => {
    app.ctx.body = "详情⻚⾯ Ctrl...";
  },
  model: async () => {
    app.ctx.body = await app.$model.user.findAll();
  }
});