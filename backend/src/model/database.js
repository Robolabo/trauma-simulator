var Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'trauma_simulator',
  'root',
  'luis110797',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports = sequelize;