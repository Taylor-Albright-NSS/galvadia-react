module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'Keywords',
			[
				{
					area_id: 3,
					actionAreaId: 2,
					special: JSON.stringify({
						direction: 'east',
					}),
					name: 'Lever',
					refName: 'lever',
					color: 'lever',
					description: 'This lever has already been activated',
					activateDescription: [`You activated the lever! The way to the east is opened.`],
					methodCode: 'tutorialLever',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					area_id: 2,
					actionAreaId: 2,
					special: JSON.stringify({
						name: 'Dagger',
						ownerId: 1,
						ownerType: 'area',
						keywords: ['dagger'],
					}),
					name: 'Wall',
					refName: 'wall',
					color: 'blue',
					description: `The wall reads: "Speak to Egbert for your next lesson"`,
					activateDescription: [`You take a closer look at the wall and see that there is something written on it`, `The wall reads: "Speak to Egbert for your next lesson"`],
					methodCode: 'tutorialWall',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					area_id: 5,
					actionAreaId: 5,
					npcId: 3, //Egbert id = 3
					special: JSON.stringify({
						name: 'Pair Of Glasses',
						keywords: ['pair', 'glasses', 'pair of glasses'],
					}),
					name: 'Parchment',
					refName: 'parchment',
					color: 'parchment',
					description: `You take a look at the stacks of parchment lying on the desk.`,
					activateDescription: [`Lifting up the parchment, you accidentally knock to the ground what was lying underneath., You look down to see a pair of glasses on the floor. You bend down and pick them up.`],
					// displayAlreadyActivated: `You lift up the parchment, but find nothing of value.`,
					methodCode: 'tutorialParchment',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Keywords', null, {})
	},
}
