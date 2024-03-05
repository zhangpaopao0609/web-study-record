const { Sequelize, DataTypes } = require('sequelize');

const db = require('./config');
const sequelize = new Sequelize(db.database, db.username, db.password, db.options);

const User = sequelize.define("User", {
  name: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: 'green'
  },
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER
});

(async () => {
  await sequelize.sync({ force: true });
  // 这里是代码
  const jane = await User.create({ name: 'Jane', age: 100, cash:1213232312 });
  const incrementResult = await jane.increment('age', { by: 2 });
  console.log(jane.toJSON());
  await jane.reload();
  console.log(jane.toJSON());
  // await jane.destroy();
})();