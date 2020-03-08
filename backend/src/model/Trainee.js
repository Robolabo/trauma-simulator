//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('./database');
// import model for FK roleID
var Role = require('./Role');

var Trainee = sequelize.define('trainee', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    surname: Sequelize.STRING,
    email: Sequelize.STRING,
    course: Sequelize.INTEGER,
    hospital: Sequelize.STRING,
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
  
  Trainee.belongsTo(Role)

  module.exports = Trainee