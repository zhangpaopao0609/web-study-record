const { Sequelize, DataTypes } = require('sequelize');

const db = require('./config');

const sequelize = new Sequelize(db.database, db.username, db.password, db.options);

const User = sequelize.define('User', {
  flag: { 
    type: DataTypes.BOOLEAN, 
    allowNull: false, 
    defaultValue: true
  },
  myDate: {
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uniqueOne: {
    type: DataTypes.STRING,
    unique: "compositeIndex"
  },
  uniqueTwo: {
    type: DataTypes.INTEGER,
    unique: "compositeIndex"
  },
  someUnique: {
    type: DataTypes.STRING,
    unique: true
  },
  identifier: {
    type: DataTypes.STRING
  },
  incrementMe: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fieldWithUnderscores: {
    type: DataTypes.STRING,
    field:'field_with_underscores'
  },
  // bar_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Bar,
  //     key: 'id',
  //   }
  // }
  commentMe: {
    type: DataTypes.INTEGER,
    comment: '这是带有注释的列'
  }
}, {
  indexes:[{unique: true, fields: ['someUnique']}]
});

(async () => {
  await sequelize.sync({ force: true });
  // 这里是代码
})();

// `sequelize.define` 会返回模型
console.log(User === sequelize.models.User); // true
