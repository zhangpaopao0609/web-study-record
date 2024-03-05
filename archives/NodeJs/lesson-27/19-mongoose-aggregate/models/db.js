const mongoose = require('mongoose');

mongoose.connect("mongodb://10.12.6.144:3308/arrow", { useNewUrlParser: true }, err => {
  if(err) {
    console.log(err);
    return;
  };
  console.log("数据库连接成功！");
});

module.exports = mongoose;

