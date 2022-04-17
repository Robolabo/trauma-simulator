'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'trainees',
      {
        traineeId:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
      },
        name: {
          type: Sequelize.STRING
      },
        surname: {
          type: Sequelize.STRING
      },
        email: {
          type: Sequelize.STRING,
          unique: true
      },
        password: {
          type: Sequelize.STRING
      } ,
        roleId: {
          type: Sequelize.INTEGER,
          unique: "compositeKey",
          allowNull: false
      },
        workplace: {
          type: Sequelize.STRING
      } ,
        session: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
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
    return queryInterface.dropTable('trainees');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
