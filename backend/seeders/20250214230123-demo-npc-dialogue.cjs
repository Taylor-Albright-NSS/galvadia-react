//NPC IDs
// 1 = Joch
// 2 = Clyde
// 3 = Egbert
module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'NpcDialogues',
			[
				{
					id: 1,
					npcId: 1,
					dialogueStage: 1,
					dialogue: [`Hello, my name is Joch!`, `I am a weaponsmith, but I have not yet been programmed to sell weapons!`],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 2,
					npcId: 1,
					dialogueStage: 2,
					dialogue: [`Clyde here is my brother.`, `He sells armor.`],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 3,
					npcId: 2,
					dialogueStage: 1,
					dialogue: [`Hello, my name is Clyde!`, `I am an Armorsmith, but I have not yet been programmed to sell armor!`],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 4,
					npcId: 2,
					dialogueStage: 2,
					dialogue: [`Joch here is my brother.`, `He sells weapons.`],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 5,
					npcId: 3,
					dialogueStage: 1,
					dialogue: [`Hello there!. My name is Egbert.`],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('NpcDialogues', null, {})
	},
}
