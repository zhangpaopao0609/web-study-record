const { Sequelize } = require('sequelize');

const db = require('./config');

const sequelize = new Sequelize(db.database, db.username, db.password, db.options);

async function aa() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

aa()
