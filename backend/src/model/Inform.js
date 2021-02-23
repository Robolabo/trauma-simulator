//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('./database');
var Simulation = require('./Simulation')

var Inform = sequelize.define('inform', {
    actId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    simulationId: {
        type: Sequelize.INTEGER,
        foreingKey: true
    },
    message: Sequelize.STRING,
    minute: Sequelize.INTEGER,
    second: Sequelize.INTEGER,
    heartRate: Sequelize.DOUBLE,
    breathingRate: Sequelize.DOUBLE,
    sistolicPressure: Sequelize.DOUBLE,
    diastolicPressure: Sequelize.DOUBLE,
    urineOutput: Sequelize.DOUBLE,
    saturation: Sequelize.DOUBLE,
    temperature: Sequelize.DOUBLE, 
    bloodLoss: Sequelize.DOUBLE 
},
{
	 timestamps: false,
});

Inform.belongsTo(Simulation, {as:'simulationInform', foreignKey:'simulationId'});

module.exports = Inform