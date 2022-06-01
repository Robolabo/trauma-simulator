'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'evaluations',
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
        trainerId:{
          type: Sequelize.INTEGER
      },
        roleId: {
          type: Sequelize.INTEGER

      },
        simulationId: {
          type: Sequelize.INTEGER

      },
        phase:{
          type: Sequelize.STRING
      },
        actionId:{
          type: Sequelize.INTEGER
      },
        sistolicPressure: {
          type: Sequelize.DOUBLE
      },

        diastolicPressure: {
          type: Sequelize.DOUBLE
      } ,

        heartRate: {
          type: Sequelize.DOUBLE
      },

        breathingRate: {
          type: Sequelize.DOUBLE
      },
        saturation: {
          type: Sequelize.DOUBLE
      },

        partBody: {
          type: Sequelize.STRING
      },
        mentalStatus: {
          type: Sequelize.STRING
      },
        minute: {
          type: Sequelize.INTEGER
      },
        second: {
          type: Sequelize.INTEGER
      },

        age: {
         type: Sequelize.INTEGER
     }
      },
      {
        sync: { force: true}
      }
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('evaluations');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};