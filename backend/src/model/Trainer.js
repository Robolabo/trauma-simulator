//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('./database');
// import model for FK roleID
var Role = require('./Role');

var Trainer = sequelize.define('trainer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  surname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  workplace: Sequelize.STRING,
  roleId: {
    type: Sequelize.INTEGER,
    // This is a reference to another model
    references: {
      model: Role,
      key: 'id'
    }
  }
},
{
	 timestamps: false,
});

Trainer.belongsTo(Role);


module.exports = Trainer