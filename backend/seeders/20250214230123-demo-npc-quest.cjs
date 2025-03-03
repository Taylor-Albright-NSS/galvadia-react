module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('NpcQuests', [{
      id: 1,
      npcId: 1,
      questStage: 1,
      dialogue: [`This is the first stage of my quest. To complete it, simply type 'offer'.`, `This is the second element in the array that should show up below my previous sentence.`],
      completionDialogue: [`Congrats! You completed it!`, `This should appear below the first sentence!`],
      requirements: JSON.stringify({
        requiredLevel: 2,
        requiredItems: null,
      }),
      rewards: JSON.stringify({
        gold: 10,
        experience: 100,
        skillPoints: 1,
        attributePoints: 1,
      }),
      repeatable: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      id: 2,
      npcId: 1,
      questStage: 2,
      dialogue: [`"This is the second stage of my quest. You will need to offer me any weapon in order to complete it!"`, `This should show up under my first sentence!`],
      completionDialogue: [`You completed my second quest, well done!`, `As a reward.. Well, I can't offer you anything yet!`],
      requirements: JSON.stringify({
        requiredLevel: 2,
        requiredItems: ["Dagger", "Crossbow"],
      }),
      rewards: JSON.stringify({
        gold: 20,
        experience: 200,
        skillPoints: 2,
        attributePoints: 2,
        items: ["Sword"]
      }),
      repeatable: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('NpcQuests', null, {});
  }
};
