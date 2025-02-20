module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Items', [{
      id: 1,
      name: 'Sword',
      area_id: 1, 
      playerId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
