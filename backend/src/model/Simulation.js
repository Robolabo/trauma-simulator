//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('./database');
var Trainer = require('./Trainer')
var Trainee = require('./Trainee')

var Simulation = sequelize.define('simulation', {
    simulationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    trainerId: Sequelize.INTEGER,
    traineeId: Sequelize.INTEGER,
    sex: Sequelize.INTEGER,
    age: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        validate: {
          max: 100,
          min: 0
        }
      },
    weight: Sequelize.DOUBLE,
    partBody: Sequelize.STRING,
    mentalStatus: Sequelize.STRING,
    bloodLoss: Sequelize.DOUBLE,
    sistolicPressure: {
        type: Sequelize.DOUBLE, 
        allowNull: false,
        validate: {
          max: 190,
          min: 60
        }
      },
    diastolicPressure: {
        type: Sequelize.DOUBLE, 
        allowNull: false,
        validate: {
          max: 90,
          min: 30
        }
      },
    heartRate: {
        type: Sequelize.DOUBLE, 
        allowNull: false,
        validate: {
          max: 160,
          min: 50
        }
      },
    breathingRate: {
        type: Sequelize.DOUBLE, 
        allowNull: false,
        validate: {
          max: 60,
          min: 0
        }
      },
    urineOutput: Sequelize.DOUBLE,
    saturation: {
        type: Sequelize.DOUBLE, 
        allowNull: false,
        validate: {
          max: 100,
          min: 70
        }
      },
    time: Sequelize.INTEGER,
    phase: Sequelize.STRING,
    temperature: Sequelize.DOUBLE, 
    inform: Sequelize.BLOB,
    rxPelvis:Sequelize.STRING,
    testData: {
        type: Sequelize.JSON,
        defaultValue: null
    } 
},
{
	 timestamps: false,
});

Simulation.belongsTo(Trainee, {as:'trainee', foreignKey:'traineeId'});
Simulation.belongsTo(Trainer, {as:'trainer', foreignKey:'trainerId'});

module.exports = Simulation