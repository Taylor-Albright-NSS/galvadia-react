// seeders/20250214-demo-player.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Areas', [{
      id: 1,
      name: 'Town Square',
      heading: "Town Square",
      description: "This is the Town Square. It's the central area in Galvaida",
      exits: ['North', 'East', 'South', 'West'],
      x: 0,
      y: 0,
      z: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      name: 'North',
      heading: "North Of The Town Square",
      description: "North of the town square",
      exits: ['South'],
      x: 0,
      y: 1,
      z: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 3,
      name: 'East',
      heading: "East Of The Town Square",
      description: "East of the town square",
      exits: ['West'],
      x: 1,
      y: 0,
      z: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 4,
      name: 'South',
      heading: "South Of The Town Square",
      description: "South of the town square",
      exits: ['North'],
      x: 0,
      y: -1,
      z: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 5,
      name: 'West',
      heading: "Eest Of The Town Square",
      description: "West of the town square",
      exits: ['East'],
      x: 0,
      y: -1,
      z: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Undo the seed by deleting all players
    await queryInterface.bulkDelete('Areas', null, {});
  }
};
