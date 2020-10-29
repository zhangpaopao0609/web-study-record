(async () => {
  const { Sequelize } = require('sequelize');
  const sequelize = new Sequelize('arrow', 'root', '123456', {
    host: '134.175.53.155',
    dialect: 'mysql'
  });

  // 定义模型
  const Fruit = sequelize.define('Fruit', {
    name: { type: Sequelize.STRING(20), allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 }
  });

  const ret = await Fruit.sync();
})();