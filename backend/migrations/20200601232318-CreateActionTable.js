'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'actions',
      {
        actionId:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
          unique: "compositeKey"
      },
        actionName: {
          type: Sequelize.STRING
      },
        message: {
          type: Sequelize.STRING
      },
        photo: {
          type: Sequelize.BOOLEAN
      },
        bloodLossMin: {
          type: Sequelize.DOUBLE
      } ,
       bloodLossMax: {
          type: Sequelize.DOUBLE
      },
        sistolicPressureMin: {
          type: Sequelize.DOUBLE
      },
        sistolicPressureMax: {
          type: Sequelize.DOUBLE
      },
        diastolicPressureMin: {
          type: Sequelize.DOUBLE
      } ,
        diastolicPressureMax: {
          type: Sequelize.DOUBLE
      },
        heartRateMin: {
          type: Sequelize.DOUBLE
      },
        heartRateMax: {
          type: Sequelize.DOUBLE
      },
        breathingRateMin: {
          type: Sequelize.DOUBLE
      },
        breathingRateMax: {
          type: Sequelize.DOUBLE
      },
        urineOutputMin: {
          type: Sequelize.DOUBLE
      },
        urineOutputMax: {
          type: Sequelize.DOUBLE
      },
        saturationMin: {
          type: Sequelize.DOUBLE
      },
        saturationMax: {
          type: Sequelize.DOUBLE
      },
        temperatureMin: {
          type: Sequelize.DOUBLE
      },
        temperatureMax: {
          type: Sequelize.DOUBLE
      },
        partBody: {
          type: Sequelize.STRING
      },
        mentalStatus: {
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
    return queryInterface.dropTable('actions');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
