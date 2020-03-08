var Sequelize = require('sequelize');
var sequelize = require('./database');

var Role = sequelize.define('role', {
  role: Sequelize.STRING
},
{
	 timestamps: false,
});

module.exports = Role