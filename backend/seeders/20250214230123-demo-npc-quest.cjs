module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'NpcQuests',
			[
				{
					id: 1,
					npcId: 3, //Egbert
					questStage: 1,
					dialogue: [`I left my glasses somewhere in my office. Can you see if you can find them for me? My office is the room to the south.`],
					completionDialogue: [`Ahh, there they are! Thank you for retrieving them for me.`, `Let's move on to the next task.`],
					requirements: JSON.stringify({
						requiredLevel: 1,
						requiredItems: ['Pair Of Glasses'],
					}),
					rewards: JSON.stringify({
						gold: 50,
						experience: 1000,
						skillPoints: 3,
						attributePoints: 3,
					}),
					repeatable: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 2,
					npcId: 1, //Joch
					questStage: 1,
					dialogue: [`Your first task is to reach level 2.`],
					completionDialogue: [`Great job!`],
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
					id: 3,
					npcId: 1, //Joch
					questStage: 2,
					dialogue: [`For your next task, return to me a Dagger and Crossbow`],
					completionDialogue: [`You completed my second quest, well done!`, `As a reward.. Well, I can't offer you anything yet!`],
					requirements: JSON.stringify({
						requiredLevel: 2,
						requiredItems: ['Dagger', 'Crossbow'],
					}),
					rewards: JSON.stringify({
						gold: 20,
						experience: 200,
						skillPoints: 2,
						attributePoints: 2,
						items: ['Sword'],
					}),
					repeatable: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('NpcQuests', null, {})
	},
}
