module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Npcs', [{
      id: 1,
      name: 'Joch',
      area_id: 1, 
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      id: 2,
      name: 'Clyde',
      area_id: 1, 
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'Egbert',
      area_id: 1, 
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Npcs', null, {});
  }
};
