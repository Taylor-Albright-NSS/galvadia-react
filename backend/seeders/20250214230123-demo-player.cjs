module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Players', [{
      id: 1,
      name: 'John Doe',
      area_id: 1,  // Assuming you have an area with ID 1
      level: 1,
      experience: 0,
      x: 0,
      y: 0,
      z: 0, 
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      name: 'Jane Smith',
      area_id: 1,  // Assuming you have an area with ID 2
      level: 1,
      experience: 0,
      x: 0,
      y: 0,
      z: 0, 
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    // Undo the seed by deleting all players
    await queryInterface.bulkDelete('Players', null, {});
  }
};
