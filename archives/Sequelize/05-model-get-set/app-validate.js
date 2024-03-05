const { Sequelize, DataTypes, Op } = require('sequelize');

const db = require('./config');
const sequelize = new Sequelize(db.database, db.username, db.password, db.options);

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    // 获取器
    get() {
      const rawValue = this.getDataValue('username');
      return rawValue ? rawValue.toUpperCase() : null;
    }
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        msg: '必须是邮箱格式哟！'
      }
    }
  }
});

(async () => {
  await sequelize.sync({ force: true });
  // 这里是代码
  const user = await User.create({ username: 'SuperUser', password: '11@aa' });
  console.log(user.password);
  console.log(user.getDataValue('password'));
})();