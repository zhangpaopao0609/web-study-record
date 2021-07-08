//1. 引入mongoose
const mongoose = require('mongoose');

//2. 建立连接
mongoose.connect("mongodb://10.12.6.144:3308/arrow", { useNewUrlParser: true , useUnifiedTopology: true }, err => {
  if(err) {
    console.log(err);
    return;
  };
  console.log("数据库连接成功！");
});

module.exports = mongoose;