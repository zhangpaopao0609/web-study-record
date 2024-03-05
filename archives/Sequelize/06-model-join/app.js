const { Sequelize, DataTypes, Op, Model } = require('sequelize');

const db = require('./config');
const sequelize = new Sequelize(db.database, db.username, db.password, db.options);

const User = require('./models/user')(sequelize, DataTypes, Model);
const DirvingLicense = require('./models/dirving_license')(sequelize, DataTypes, Model);
User.hasOne(DirvingLicense);
DirvingLicense.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
});

(async () => {
  await sequelize.sync({ force: true });
  // 这里是代码
  await User.create({ userId: '001', userName: 'arrow' });
  await User.create({ userId: '002', userName: 'li' });
  await User.create({ userId: '003', userName: 'wang' });
  await DirvingLicense.create({ userId: '001', licenseId: 'l001' });
  await DirvingLicense.create({ userId: '002', licenseId: 'l002' });
})();