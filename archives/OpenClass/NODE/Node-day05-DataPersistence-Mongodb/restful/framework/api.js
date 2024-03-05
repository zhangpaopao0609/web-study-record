module.exports = {
  init: async (ctx, next) => {
    console.log(ctx.params);
    const { list } = ctx.params;
    const model = ctx.app.$model[list];
    if(model) {
      ctx.list = model;
      await next();
    }else {
      ctx.body = 'no this model';
    }
  },

  get: async ctx => {
    ctx.body = await ctx.list.findOne({ _id: ctx.params.id });
  },

  list: async ctx => {
    ctx.body = await ctx.list.find({});
  },

  create: async ctx => {
    console.log(ctx.request.body);
    ctx.body = await ctx.list.create(ctx.request.body);
  },

  update: async ctx => {
    ctx.body = await ctx.list.updateOne({ _id: ctx.params.id });
  },

  del: async ctx => {
    ctx.body = await ctx.list.deleteOne({ _id: ctx.params.id });
  },

  page: async ctx => {
    console.log('page...', ctx.params.page);
    ctx.body = await ctx.list.find({});
  }
};