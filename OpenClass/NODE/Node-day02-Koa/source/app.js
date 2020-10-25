const Arrow = require('./arrow.js');
const app = new Arrow();

// app.use((req, res) => {
//   res.writeHead(200);
//   res.end('hi arrow');
// });

app.use((ctx) => {
  ctx.body = 'hi arrow 1';
});

app.listen(6091, err => {
  if (err) {
    console.log(`服务启动失败： ${err}`);
  } else {
    console.log('服务启动成功：6091');
  };
})