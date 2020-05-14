var Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'trauma_simulator',
  'root',
  'luis110797',
  {
    host: 'mysql',
    dialect: 'mysql',
    port: '3306'
  }
);

module.exports = sequelize;