//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('./database');
// import model for FK roleID
var Role = require('./Role');

var Trainer = sequelize.define('trainer', {
  trainerId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  name: {
    type: Sequelize.STRING, 
    allowNull: false,
    validate:{
      is: /^[a-zA-ZÀ-ÿ\s]{1,40}$/i
    }
  },
  surname: {
    type: Sequelize.STRING, 
    allowNull: false,
    validate:{
      is: /^[a-zA-ZÀ-ÿ\s]{1,40}$/i
    }
  },
  email: {
    type: Sequelize.STRING, 
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: Sequelize.STRING,
  roleId: {
    type: Sequelize.INTEGER,
    // This is a reference to another model
    references: {
      model: Role,
      key: 'id'
    }
  },
  session: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  workplace: Sequelize.STRING
},

{
	 timestamps: false,
});

Trainer.belongsTo(Role);


module.exports = Trainer