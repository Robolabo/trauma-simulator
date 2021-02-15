'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'simulations',
      {
        simulationId:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
          unique: "compositeKey"
      },
        trainerId: {
          type: Sequelize.INTEGER,
          unique: "compositeKey"
      },
        traineeId: {
          type: Sequelize.INTEGER
      },
        sex: {
          type: Sequelize.INTEGER
      },
        age: {
          type: Sequelize.INTEGER
      } ,
       weight: {
          type: Sequelize.DOUBLE
      },
        partBody: {
          type: Sequelize.STRING
      },
        mentalStatus: {
          type: Sequelize.STRING
      },
        bloodLoss: {
          type: Sequelize.DOUBLE
      } ,
        diastolicPressure: {
          type: Sequelize.DOUBLE
      },
        sistolicPressure: {
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
        time: {
          type: Sequelize.INTEGER
      },
        inform: {
          type: Sequelize.BLOB
      },
        testData: {
          type: Sequelize.JSON,
          defaultValue: null
      },
      phase: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('simulations');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
