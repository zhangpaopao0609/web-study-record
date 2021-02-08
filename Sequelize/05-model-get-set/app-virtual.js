const { Sequelize, DataTypes, Op } = require('sequelize');

const db = require('./config');
const sequelize = new Sequelize(db.database, db.username, db.password, db.options);

const User = sequelize.define('Users', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.firstName + '@' + this.lastName;
    },
    set(val) {
      throw new Error("Do not set fullname never!");
    }
  }
});

(async function() {
  await sequelize.sync({ force: true });
  const user = await User.create({firstName: 'arrow', lastName: 'bo'});
  console.log(user.fullName);
})();