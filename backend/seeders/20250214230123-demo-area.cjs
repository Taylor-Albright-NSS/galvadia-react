module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Areas', [{
      id: 1,
      name: 'Town Square',
      heading: "Town Square",
      headingColor: "galvadia-town",
      description: "This is the Town Square of Galvadia. It's the central area in Galvadia. There is a lever here.",
      exitsBool: JSON.stringify({
        north: true,
        east: true,
        south: 'locked',
        west: true
      }),
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
      exitsBool: JSON.stringify({
        south: true,
      }),
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
      exitsBool: JSON.stringify({
        west: true,
      }),
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
      exitsBool: JSON.stringify({
        north: true,
      }),
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
      exitsBool: JSON.stringify({
        east: true,
      }),
      x: 0,
      y: -1,
      z: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Areas', null, {});
  }
};
