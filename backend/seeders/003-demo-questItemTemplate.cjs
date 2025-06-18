module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'QuestItemTemplates',
			[
				{
					id: 1,
					name: 'Pair Of Glasses',
					questId: 3,
					ownerId: null,
					templateType: 'quest',
					ownerType: null,
					location: null,
					keywords: ['pair of glasses', 'pair', 'glasses'],
					description: 'A well worn pair of glasses that are surprisingly well kept.',

					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('QuestItemTemplates', null, {})
	},
}
