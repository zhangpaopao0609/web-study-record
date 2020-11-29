module.exports = {
  "get /": async ctx => {
    ctx.body = "⽤户⾸⻚";
  },
  "get /info": ctx => {
    ctx.body = "⽤户详情⻚⾯";
  }
};