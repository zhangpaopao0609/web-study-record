const Koa = require('koa');
const { initRouter, initController } = require('./loader/agg-loader');

class agg {
  constructor() {
    this.$app = new Koa();
    this.$ctrl = initController();
    this.$router = initRouter(this);
    this.$app.use(this.$router.routes());
  }

  start() {
    const port = 6090;
    this.$app.listen(port, err => {
      if(err) throw err;
      console.log(`app start at ${port}`);
    });
  }
};

module.exports = agg;