const { Sequelize, DataTypes, Op } = require('sequelize');

const db = require('./config');
const sequelize = new Sequelize(db.database, db.username, db.password, db.options);

const User = sequelize.define("User", {
  name: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: 'green'
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cash: DataTypes.INTEGER
});

(async () => {
  await sequelize.sync({ force: true });
  // 这里是代码
  await User.create({ name: 'Jane', age: 20, cash:12 });
  await User.create({ name: 'arrow', age: 40, cash:13 });
  await User.bulkCreate([
    { name: 'Jack Sparrow', age: 1 },
    { name: 'Davy Jones', age: 1 }
  ]);
  await User.update({ name: 'BO' }, {
    where: {
      name: 'arrow'
    }
  });
  const {count, rows} = await User.findAndCountAll({
    limit: 1,
    offset: 1
  });
  console.log("All users:",count, JSON.stringify(rows, null, 2));
})();