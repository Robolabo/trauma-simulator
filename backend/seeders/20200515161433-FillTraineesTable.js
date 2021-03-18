'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('trainees',[
      {
        traineeId: 1,
        name: 'Luis',
        surname: 'Castañeda López',
        email: 'luis@gmail.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        roleId: 4,
        workplace: 'Hospital de Alcorcón'
      },
      {
        trainerId: 2,
        name: 'Entrenador',
        surname: 'Fit',
        email: 'train@gmail.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        roleId: 2,
        workplace: 'Hospital de Alcorcón'
      }
    ] );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('trainees', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
