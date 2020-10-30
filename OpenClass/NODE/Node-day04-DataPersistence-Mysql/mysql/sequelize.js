const { first } = require('lodash');

(async () => {
  const { Sequelize } = require('sequelize');
  const sequelize = new Sequelize('arrow', 'root', '123456', {
    host: '134.175.53.155',
    dialect: 'mysql'
  });

  // 定义模型
  const Fruit = sequelize.define('Fruit', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV1,
      primaryKey: true
    },
    name: { type: Sequelize.STRING(20), allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 }
  });

  const ret = await Fruit.sync({ force: true });
  // const ret = await Fruit.sync();

  const TABLE_INSERT = await Fruit.create({
    name: '香蕉',
    price: 3.5
  });
  // console.log(TABLE_INSERT);

  const TABLE_UPDATE = await Fruit.update({
    price: 4
  }, {
    where: { name: '香蕉' }
  });

  const Op = Sequelize.Op;
  const TABLE_SELECT = await Fruit.findAll({
    where: { price: { [Op.lt]: 5, [Op.gt]: 2 } }
  });

})();