module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('PlayerNpcs', [
    {
      playerId: 1,
      npcId: 1,
      area_id: 1,
      dialogueStage: 1,
      dialogueIndex: 0,
      questStage: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      playerId: 1,
      npcId: 2,
      area_id: 1,
      dialogueStage: 2,
      dialogueIndex: 0,
      questStage: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      playerId: 1,
      npcId: 3,
      area_id: 1,
      dialogueStage: 1,
      dialogueIndex: 0,
      questStage: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
  ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('PlayerNpcs', null, {});
  }
};
