module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('PlayerNpcs', [
    {
      id: 1,
      playerId: 1,
      npcId: 1,
      dialogueStage: 1,
      dialogueIndex: 0,
      questStage: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      id: 2,
      playerId: 1,
      npcId: 2,
      dialogueStage: 2,
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
