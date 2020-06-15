var Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'trauma_simulator',
  'root',
  'luis110797',
  {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306'
  }
);

module.exports = sequelize;
//Arreglar cambios en la vista de nueva simulacion, hay campos nuevos.