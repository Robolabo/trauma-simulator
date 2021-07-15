//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('./database');
// import model for FK roleID
var Role = require('./Role');

var Trainee = sequelize.define('trainee', {
  traineeId: {
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
  surname:  {
    type: Sequelize.STRING, 
    allowNull: false,
    validate:{
      is: /^[a-zA-ZÀ-ÿ\s]{1,40}$/i
    }
  },
  email:  {
    type: Sequelize.STRING, 
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password:  {
    type: Sequelize.STRING, 
    allowNull: false,
    validate:{
     len: [6,250]
  }},
  roleId: {
    type: Sequelize.INTEGER,
    // This is a reference to another model
    references: {
      model: Role,
      key: 'id'
    }
  },
  workplace: Sequelize.STRING
},
{
	 timestamps: false,
});

Trainee.belongsTo(Role);


module.exports = Trainee