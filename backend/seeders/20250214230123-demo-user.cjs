module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      name: 'Taylor',
      userName: 'Mudfobby',
      email: 't@gmail.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      name: 'Kyle',
      userName: 'Carcass',
      email: 'k@gmail.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    // Undo the seed by deleting all players
    await queryInterface.bulkDelete('Users', null, {});
  }
};
