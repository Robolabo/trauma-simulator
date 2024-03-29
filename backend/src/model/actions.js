//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('./database');

var Action = sequelize.define('action', {
    actionId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    actionName: Sequelize.STRING,
    message: Sequelize.STRING,
    photo: Sequelize.BOOLEAN,
    bloodLossMin: Sequelize.DOUBLE,
    bloodLossMax: Sequelize.DOUBLE,
    sistolicPressureMin: Sequelize.DOUBLE,
    sistolicPressureMax: Sequelize.DOUBLE,
    diastolicPressureMin: Sequelize.DOUBLE,
    diastolicPressureMax: Sequelize.DOUBLE,
    heartRateMin: Sequelize.DOUBLE,
    heartRateMax: Sequelize.DOUBLE,
    breathingRateMin: Sequelize.DOUBLE,
    breathingRateMax: Sequelize.DOUBLE,
    urineOutputMin: Sequelize.DOUBLE,
    urineOutputMax: Sequelize.DOUBLE,
    saturationMin: Sequelize.DOUBLE,
    saturationMax: Sequelize.DOUBLE,
    temperatureMin: Sequelize.DOUBLE,
    temperatureMax: Sequelize.DOUBLE,
    partBody: Sequelize.STRING,
    mentalStatus: Sequelize.STRING,
    time: Sequelize.INTEGER,
    age:Sequelize.INTEGER
},
{
	 timestamps: false,
});


module.exports = Action