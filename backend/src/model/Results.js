var Sequelize = require('sequelize');

// importing connection database
var sequelize = require('./database');
var Simulation = require('./Simulation');
const Trainee = require('./Trainee');



var Result = sequelize.define('Result', {
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
    SimulationId: {
        type: Sequelize.INTEGER,
        foreingKey: true
        
    },

    matches: Sequelize.STRING,
    swap: Sequelize.STRING,
    contr: Sequelize.STRING,
    gasp: Sequelize.STRING,
    mismatches: Sequelize.STRING,
    GA: Sequelize.STRING,
    Diag: Sequelize.STRING,
    Subseq: Sequelize.STRING,
    Preci: Sequelize.STRING,
    Recall: Sequelize.STRING,
    Specificity: Sequelize.STRING,
    Accuracy: Sequelize.STRING,
    F1: Sequelize.STRING,
    Nota: Sequelize.STRING
},
{
	 timestamps: false,
});

Result.belongsTo(Simulation, {as:'simulationResult', foreignKey:'simulationId'});
Result.belongsTo(Trainee, {as:'traineeResult', foreignKey:'traineeId'});



module.exports = Result