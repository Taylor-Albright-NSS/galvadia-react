module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Items', [{
      id: 1,
      name: 'Sword',
      ownerId: 1, 
      ownerType: "player",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      name: 'Dagger',
      ownerId: 1, 
      ownerType: "area",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 3,
      name: 'Crossbow',
      ownerId: 2, 
      ownerType: "area",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
