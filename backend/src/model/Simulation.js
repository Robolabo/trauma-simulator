//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('./database');

var Simulation = sequelize.define('simulation', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sex: Sequelize.STRING,
    age: Sequelize.INTEGER,
    weight: Sequelize.DOUBLE,
    partBody: Sequelize.STRING,
    bloodLoss: Sequelize.DOUBLE,
    bloodPreasure: Sequelize.DOUBLE,
    heartRate: Sequelize.INTEGER,
    breathingRate: Sequelize.DOUBLE,
    urineOutput: Sequelize.DOUBLE,
    saturation: Sequelize.INTEGER,
    mentalStatus: Sequelize.STRING,
    time: Sequelize.INTEGER
},
{
	 timestamps: false,
});

module.exports = Simulation