module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Items', [{
      name: 'Training Onehanded Sword',
      ownerId: 1, 
      ownerType: "player",
      location: "inventory",
      isTwoHanded: false,
      keywords: ['training', 'onehanded', 'sword', 'training onehanded', 'onehanded sword', 'training onehanded sword'],
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
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
      name: 'Twohanded Blue Sabre',
      ownerId: 2, 
      ownerType: "area",
      location: null,
      keywords: ["twohanded", "blue", "sabre", "twohanded blue sabre"],
      isTwoHanded: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Twohanded Bastard Sword',
      ownerId: 2, 
      ownerType: "area",
      location: null,
      keywords: ["twohanded", "bastard", "sword", "twohanded bastard sword", 'twohanded bastard', 'bastard sword', 'twohanded bastard sword'],
      isTwoHanded: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Shortsword',
      ownerId: 2,
      ownerType: "area",
      location: null,
      keywords: ["shortsword", "sword", 'short', 'short sword'],
      isTwoHanded: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    
  ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
