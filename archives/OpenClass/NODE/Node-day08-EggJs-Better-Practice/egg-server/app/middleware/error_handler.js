module.exports = (option, app) => {
  return async function (ctx, next)  {
    try {
      await next();
    } catch (err) {
      // 触发error事件
      app.emit('error', err, this);

      const status = err || 500;
      // 500
      const error = 
        status === 500 && app.config.env === 'prod' ? 
        'Internal Server Error' : 
        err.message;

      ctx.body = {
        code: status,
        error
      };

      if (status === 422) {
        ctx.body.detail = err.errors;
      };
      ctx.status = 200;
    }
  }
}