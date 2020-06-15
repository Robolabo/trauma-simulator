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
    age: Sequelize.INTEGER,
    weight: Sequelize.DOUBLE,
    partBody: Sequelize.STRING,
    mentalStatus: Sequelize.STRING,
    bloodLoss: Sequelize.DOUBLE,
    sistolicPressure: Sequelize.DOUBLE,
    diastolicPressure: Sequelize.DOUBLE,
    heartRate: Sequelize.DOUBLE,
    breathingRate: Sequelize.DOUBLE,
    urineOutput: Sequelize.DOUBLE,
    saturation: Sequelize.DOUBLE,
    time: Sequelize.INTEGER,
    temperature: Sequelize.DOUBLE,  
},
{
	 timestamps: false,
});

Simulation.belongsTo(Trainee, {as:'trainee', foreignKey:'traineeId'});
Simulation.belongsTo(Trainer, {as:'trainer', foreignKey:'trainerId'});

module.exports = Simulation