module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Keywords', [{
      id: 1,
      area_id: 1,
      actionAreaId: 1,
      actionDirections: "south",
      name: 'Lever',
      refName: 'lever',
      color: 'lever',
      description: "This is a lever!",
      action: "pull",
      methodCode: "pullLever",  // Specify the method that should be executed
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Keywords', null, {});
  }
};
