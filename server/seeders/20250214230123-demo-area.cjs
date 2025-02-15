// seeders/20250214-demo-player.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Areas', [{
      id: 1,
      name: 'Town Square',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Undo the seed by deleting all players
    await queryInterface.bulkDelete('Areas', null, {});
  }
};
