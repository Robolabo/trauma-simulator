'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'informs',
      {
        actId:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
          unique: "compositeKey"
      },
        simulationId: {
          type: Sequelize.INTEGER
      },
        message: {
          type: Sequelize.STRING
      },
        bloodLoss: {
          type: Sequelize.DOUBLE
      } ,
        sistolicPressure: {
          type: Sequelize.DOUBLE
      },
        diastolicPressure: {
          type: Sequelize.DOUBLE
      },
        heartRate: {
          type: Sequelize.DOUBLE
      },
        breathingRate: {
          type: Sequelize.DOUBLE
      },
        urineOutput: {
          type: Sequelize.DOUBLE
      },
        saturation: {
          type: Sequelize.DOUBLE
      },
        temperature: {
          type: Sequelize.DOUBLE
      },
       minute: {
         type: Sequelize.INTEGER
      },
      second: {
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
    return queryInterface.dropTable('informs');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
