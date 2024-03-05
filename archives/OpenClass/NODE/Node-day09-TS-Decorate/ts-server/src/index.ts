import * as Koa from "koa";
import * as bodify from "koa-body";
import * as serve from "koa-static";
import * as path from 'path';

import { Sequelize } from 'sequelize-typescript';

const database = new Sequelize({
  port: 3309,
  host:'10.12.6.144',
  database: 'arrow',
  username: 'root',
  password: '123456',
  dialect: 'mysql',
  modelPaths: [`${__dirname}/model`]
});

database.sync({ force: true });

const app = new Koa();

app.use(serve(`${__dirname}/public`));
app.use(bodify({
  multipart: true,
  //  使用非严格模式 允许 delete
  strict: false
}));

import { load } from './utils/decorate';
const router = load(path.resolve(__dirname, './routes'));
app.use(router.routes());

const port = 6090;
app.listen(port, err => {
  if (err) throw err;
  console.log(`app start at ${port}`);
});