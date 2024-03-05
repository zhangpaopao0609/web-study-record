const jsonwebtoken = require('jsonwebtoken');
const secret = '12345678';

const opt = {
  secret: 'jwt_secret',
  key: 'user'
};

const user = {
  username: 'abc',
  passward: '11111'
};

const token = jsonwebtoken.sign({
  data: user,
  // 设置token过期时间
  exp: Math.floor(Date.now() / 1000) + (60 * 60)
}, secret);


console.log('生成token' + token);

console.log('解码',  jsonwebtoken.verify(token, secret));