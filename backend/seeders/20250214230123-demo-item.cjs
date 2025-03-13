module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Items', [{
      id: 1,
      name: 'Sword',
      ownerId: 1, 
      ownerType: "player",
      location: "inventory",
      isTwoHanded: false,
      keywords: ["sword"],
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      id: 2,
      name: 'Dagger',
      ownerId: 1, 
      ownerType: "area",
      location: null,
      keywords: ["dagger"],
      isTwoHanded: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      id: 3,
      name: 'Crossbow',
      ownerId: 2, 
      ownerType: "area",
      location: null,
      keywords: ["crossbow"],
      isTwoHanded: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: 'Twohanded Blue Sabre',
      ownerId: 2, 
      ownerType: "area",
      location: null,
      keywords: ["twohanded", "blue", "sabre", "twohanded blue sabre"],
      isTwoHanded: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
