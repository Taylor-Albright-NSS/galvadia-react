module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'Npcs',
			[
				{
					id: 1,
					area_id: 2,
					name: 'Joch',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 2,
					area_id: 2,
					name: 'Clyde',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 3,
					area_id: 1,
					name: 'Egbert',
					speakInteraction: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('Npcs', null, {})
	},
}
