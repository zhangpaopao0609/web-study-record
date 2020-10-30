const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();

app.use(require('koa-static')(`${__dirname}/`));
app.use(bodyParser());

// 引用模型
const sequelize = require('./util/database.js');
const Product = require('./models/product.js');
const User = require('./models/user.js');
const Cart = require('./models/cart.js');
const CartItem = require('./models/cart-item.js');
const Order = require('./models/order.js');
const OrderItem = require('./models/order-item.js');

// 定义关系
Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
  through: CartItem
});
Product.belongsToMany(Cart, {
  through: CartItem
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
  through: OrderItem
});
Product.belongsToMany(Order, {
  through: OrderItem
});

// 同步数据库
sequelize.sync().then(async result => {
  let user = await User.findByPk(1);
  if(!user) {
    user = await User.create({
      name: 'arrow',
      email: 'arrow@bullet.com'
    });
    await user.createCart();
  }
  app.listen(6090, () => console.log('Listen to port 6090!!!!!!!!!!!'));
});

// 模拟鉴权
app.use(async (ctx, next) => {
  const user = await User.findByPk(1);
  ctx.user = user;
  await next();
});

/**
 * 查询商品
 */
router.get('/admin/products', async (ctx, next) => {
  const products = await Product.findAll();
  ctx.body = { prods: products };
});

app.use(router.routes());