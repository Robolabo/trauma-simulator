//import sequelize
var Sequelize = require('sequelize');

// importing connection database
var sequelize = require('./database');
var Simulation = require('./Simulation');
const Trainer = require('./Trainer');
const Trainee = require('./Trainee');


var Evaluation = sequelize.define('evaluation', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },    
    
    TraineeId: {
        type: Sequelize.INTEGER,
        foreingKey: true
        
    }, 
    TrainerId: {
        type: Sequelize.INTEGER,
        foreingKey: true
        
    }, 
    roleId: {
        type: Sequelize.INTEGER

        
    },

    SimulationId: {
        type: Sequelize.INTEGER,
        foreingKey: true
        
    },
    phase:{
        type: Sequelize.STRING
    },
    
    actionId: {
        type: Sequelize.INTEGER
        
    },


    
    minute: Sequelize.INTEGER,
    second: Sequelize.INTEGER,
    heartRate: Sequelize.DOUBLE,
    breathingRate: Sequelize.DOUBLE,
    sistolicPressure: Sequelize.DOUBLE,
    diastolicPressure: Sequelize.DOUBLE,
    saturation: Sequelize.DOUBLE,
    partBody: Sequelize.STRING,
    mentalStatus: Sequelize.STRING,
    age: Sequelize.DOUBLE
},
{
	 timestamps: false,
});

Evaluation.belongsTo(Simulation, {as:'simulationEvaluation', foreignKey:'simulationId'});
Evaluation.belongsTo(Trainee, {as:'traineeEvaluation', foreignKey:'traineeId'});
Evaluation.belongsTo(Trainer, {as:'trainerEvaluation', foreignKey:'trainerId'});


module.exports = Evaluation