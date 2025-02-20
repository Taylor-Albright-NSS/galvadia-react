module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Enemies', [{
      id: 1,
      area_id: 1,
      name: 'Goblin',
      health: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Enemies', null, {});
  }
};
