var Sequelize = require('sequelize');

// importing connection database
var sequelize = require('./database');
var Simulation = require('./Simulation');
const Trainee = require('./Trainee');



var Result = sequelize.define('result', {
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

    matches: {
          type:Sequelize.STRING,
          defaultValue: "0"
    },
    swap:  {
        type:Sequelize.STRING,
        defaultValue: "0"
  },
    contr:  {
        type:Sequelize.STRING,
        defaultValue: "0"
  },
    gasp:  {
        type:Sequelize.STRING,
        defaultValue: "0"
  },
    mismatches: {
        type:Sequelize.STRING,
        defaultValue: "0"
  },
    GA:  {
        type:Sequelize.STRING,
        defaultValue: "0"
  },
    Diag:  {
        type:Sequelize.STRING,
        defaultValue: "0"
  },
    Subseq:  {
        type:Sequelize.STRING,
        defaultValue: "0"
  },
    Preci:  {
        type:Sequelize.STRING,
        defaultValue: "0"
  },
    Recall:  {
        type:Sequelize.STRING,
        defaultValue: "0"
  },
    Specificity:  {
        type:Sequelize.STRING,
        defaultValue: "0"
  },
    Accuracy:  {
        type:Sequelize.STRING,
        defaultValue: "0"
  },
    F1:  {
        type:Sequelize.STRING,
        defaultValue: "0"
  },
    Nota:  {
        type:Sequelize.STRING,
        defaultValue: "0"
  }
},
{
	 timestamps: false,
});

Result.belongsTo(Simulation, {as:'simulationResult', foreignKey:'simulationId'});
Result.belongsTo(Trainee, {as:'traineeResult', foreignKey:'traineeId'});



module.exports = Result