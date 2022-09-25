'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Attendances', [
      {
        eventId: 1,
        userId: 1,
        status: 'attending',
      },
      {
        eventId: 1,
        userId: 2,
        status: "maybe",
      },
      {
        eventId: 1,
        userId: 3,
        status: "nope",
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Attendances', {
      eventId: { [Op.eq]: 1 }
    }, {});
  }
};
