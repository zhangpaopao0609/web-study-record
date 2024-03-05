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
    get() {
      const val = this.getDataValue('password');
      return val ? val.slice(0, -1) : null;
    },
    set(val) {
      this.setDataValue('password', val + 1)
    } 
  }
});

(async () => {
  await sequelize.sync({ force: true });
  // 这里是代码
  const user = await User.create({ username: 'SuperUser', password: '123456' });
  console.log(user.password);
  console.log(user.getDataValue('password'));
})();