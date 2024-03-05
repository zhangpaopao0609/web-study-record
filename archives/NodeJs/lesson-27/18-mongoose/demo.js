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

//3. 定义 schema
const UsersSchema = mongoose.Schema({
  name: String,
  age: Number
});

//4. 定义数据库模型
const Users = mongoose.model("Users", UsersSchema);

//5. 操作数据库

// 查找
Users.find({}, (err, data) => {
  if(err) {
    console.log(err);
    return;
  };
  console.log(data);
});

// 增加
// const newOne = new Users({
//   name: 'arrow-102',
//   age: 102
// });
// newOne.save((err, product) => {
//   if(err) {
//     console.log(err);
//     return;
//   };
//   console.log(product);
// });

// 更新
Users.updateOne({ name: 'arrow-102' }, { $set: { name: 'arrow-1002' } }, (err, raw) => {
  if(err) {
    console.log(err);
    return;
  };
  console.log(raw);
});

// 删除
Users.deleteOne({ name: 'arrow-101' }, (err, res) => {
  if(err) {
    console.log(err);
    return;
  };
  console.log(res);
});