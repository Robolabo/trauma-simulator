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
          type:Sequelize.STRING,
          defaultValue: "0"
        },
        swap:{
          type:Sequelize.STRING,
          defaultValue: "0"
        },
       contr:{
          type:Sequelize.STRING,
          defaultValue: "0"
        },
        gasp:{
          type:Sequelize.STRING,
          defaultValue: "0"
        },
        mismatches:{
          type:Sequelize.STRING,
          defaultValue: "0"
        },
        GA:{
          type:Sequelize.STRING,
          defaultValue: "0"
        },
       Diag:{
          type:Sequelize.STRING,
          defaultValue: "0"
        },
        Subseq:{
          type:Sequelize.STRING,
          defaultValue: "0"
        },
        Preci:{
          type:Sequelize.STRING,
          defaultValue: "0"
        },
        Recall:{
          type:Sequelize.STRING,
          defaultValue: "0"
        },
        Specificity:{
          type:Sequelize.STRING,
          defaultValue: "0"
        },
        Accuracy:{
          type:Sequelize.STRING,
          defaultValue: "0"
        },
        F1:{
          type:Sequelize.STRING,
          defaultValue: "0"
        },
        Nota:{
          type:Sequelize.STRING,
          defaultValue: "0"
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
