'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('trainers',[
      {
        trainerId: 1,
        name: 'Blanca',
        surname: 'Larraga García',
        email: 'blanca@gmail.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        roleId: 2,
        workplace: 'Hospital de Alcorcón'
      },

      {
        trainerId: 2,
        name: 'Entrenador',
        surname: '',
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
    return queryInterface.bulkDelete('trainers', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
