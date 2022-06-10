'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'results',
      {
          id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            unique: "compositeKey"
        },
          traineeId:{
            type: Sequelize.INTEGER
        },

        simulationId: {
            type: Sequelize.INTEGER

        },
        matches:{
          type:Sequelize.STRING
        },
        swap:{
          type:Sequelize.STRING
        },
       contr:{
          type:Sequelize.STRING
        },
        gasp:{
          type:Sequelize.STRING
        },
        mismatches:{
          type:Sequelize.STRING
        },
        GA:{
          type:Sequelize.STRING
        },
       Diag:{
          type:Sequelize.STRING
        },
        Subseq:{
          type:Sequelize.STRING
        },
        Preci:{
          type:Sequelize.STRING
        },
        Recall:{
          type:Sequelize.STRING
        },
        Specificity:{
          type:Sequelize.STRING
        },
        Accuracy:{
          type:Sequelize.STRING
        },
        F1:{
          type:Sequelize.STRING
        },
        Nota:{
          type:Sequelize.STRING
        }

      
      },
      {
        sync: { force: true}
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
