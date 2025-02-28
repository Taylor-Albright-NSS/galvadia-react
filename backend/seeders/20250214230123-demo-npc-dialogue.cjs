module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('NpcDialogues', [{
      id: 1,
      npcId: 1,
      dialogueStage: 1,
      dialogue: [`"First sentence in stage 1 dialogue"`, `"Second sentence in stage 1 dialogue"`],
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      npcId: 1,
      dialogueStage: 2,
      dialogue: [`"First sentence in stage 2 dialogue"`, `"Second sentence in stage 2 dialogue"`],
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('NpcDialogues', null, {});
  }
};
