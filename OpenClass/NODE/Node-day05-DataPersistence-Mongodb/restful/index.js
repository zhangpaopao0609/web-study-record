const Koa = require('koa');
const app = new Koa();

const config = require('./conf.js');
const loadModel = require('./framework/loader.js');

loadModel(config)(app);

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
const static = require('koa-static');
app.use(static(`${__dirname}/`));

const restful = require('./framework/router.js');
app.use(restful);

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at port ${port}`);
});