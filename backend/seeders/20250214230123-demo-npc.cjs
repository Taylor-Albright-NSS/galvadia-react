module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Npcs', [{
      id: 1,
      name: 'Joch',
      area_id: 1, 
      dialogue: [`"Hello there"`, `"What a fine day it is today"`],
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      name: 'Clyde',
      area_id: 1, 
      dialogue: [`"HI"`, `"THE DAY COULD ALWAYS BE BETTER"`],
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Npcs', null, {});
  }
};
