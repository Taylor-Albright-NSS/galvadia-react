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
					refName: 'tutorialLever',
					actionVerb: 'pull',
					color: 'lever',
					description: ['There is a lever on the wall here. Maybe you should try pulling it?'],
					activateDescription: [`You activated the lever! The way to the east is opened.`],
					alreadyActivatedDescription: [`You have already pulled the lever. Pulling it again does nothing.`],
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
					refName: 'tutorialWall',
					actionVerb: 'examine',
					color: 'blue',
					description: [`The wall reads: "Speak to Egbert for your next lesson"`],
					activateDescription: [`You take a closer look at the wall and see that there is something written on it`, `The wall reads: "Speak to Egbert for your next lesson"`],
					alreadyActivatedDescription: [`The wall reads: "Speak to Egbert for your next lesson"`, `(Remember to examine keywords for useful information!)`],
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
					refName: 'tutorialParchment',
					actionVerb: 'examine',
					color: 'parchment',
					description: [`You take a look at the stacks of parchment lying on the desk.`],
					activateDescription: [`Lifting up the parchment, you accidentally knock to the ground what was lying underneath., You look down to see a pair of glasses on the floor. You bend down and pick them up.`],
					alreadyActivatedDescription: [`You lift up the parchment, but find nothing of value.`],
					methodCode: 'tutorialParchment',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					area_id: 6,
					actionAreaId: 6,
					// special: JSON.stringify({
					// 	direction: 'east',
					// }),
					name: 'Sign',
					refName: 'tutorialSign',
					actionVerb: 'read',
					color: 'sign',
					description: [`The sign reads: `, `Reading signs is very important for finding your way around!`],
					activateDescription: [`You activated the lever! The way to the east is opened.`],
					alreadyActivatedDescription: [`You have already pulled the lever. Pulling it again does nothing.`],
					methodCode: 'sign',
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
