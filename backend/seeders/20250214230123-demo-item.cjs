module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'Weapons',
			[
				{
					name: 'Training Onehanded Sword',
					ownerId: 1,
					ownerType: 'player',
					location: 'inventory',

					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('Weapons', null, {})
	},
}
