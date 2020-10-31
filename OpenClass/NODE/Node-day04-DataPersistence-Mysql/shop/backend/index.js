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

/**
 * 创建商品
 */
router.post('/admin/product', async (ctx, next) => {
  const body = ctx.request.body;
  const res = await ctx.user.createProduct(body);
  ctx.body = { success: true };
});

/**
 * 删除商品
 */
router.delete('/admin/product/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const res = await Product.destroy({
    where: { id }
  });
  ctx.body = { success: true };
});

/**
 * 查询购物车
 */
router.get('/cart', async (ctx, next) => {
  const cart = await ctx.user.getCart();
  const products = await cart.getProducts();
  ctx.body = { products };
});

/**
 * 添加购物车
 */
router.post('/cart', async (ctx, next) => {
  const { body } = ctx.request;
  const { id } = body;
  let newQty = 1;
  const cart = await ctx.user.getCart();
  const products = await cart.getProducts({
    where: { id }
  });
  let product;
  // 购物车中已存在此商品
  if(products.length > 0) {
    product = products[0];
  };
  if(product) {
    // 这个产品在购物车中的数量
    const oldQty = product.cartItem.quantity;
    newQty = oldQty + 1;
  }else {
    product = await Product.findByPk(id);
  };

  await cart.addProduct(product, {
    through: { quantity: newQty }
  });

  ctx.body = { success: true };
});

/**
 * 添加订单
 */
router.post('/orders', async ctx => {
  const cart = await ctx.user.getCart();
  const products = await cart.getProducts();
  const order = await ctx.user.createOrder();
  const result = await order.addProduct(
    products.map(p => {
      p.orderItem = {
        quantity: p.cartItem.quantity
      };
      return p;
    })
  );
  // 清空购物车
  await cart.setProducts(null);
  ctx.body = { success: true };
});

/**
 * 删除购物车
 */
router.delete('/cartItem/:id', async ctx => {
  const id = ctx.params.id;
  const cart = await ctx.user.getCart();
  const products = await cart.getProducts({
    where: { id }
  });
  const product = products[0];
  await product.cartItem.destroy();
  ctx.body = { success: true };
})

/**
 * 查询订单
 */
router.get('/orders', async ctx => {
  const orders = await ctx.user.getOrders({ 
    include: ['products'],
    order: [['id', 'DESC']],
  });
  ctx.body = { orders } 
})

app.use(router.routes());