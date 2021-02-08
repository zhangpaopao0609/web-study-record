const User = (sequelize, DataTypes, Model) => {
  class User extends Model {}

  User.init({
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING
    }
  }, {
    sequelize 
  });

  return User;
};

module.exports = User;