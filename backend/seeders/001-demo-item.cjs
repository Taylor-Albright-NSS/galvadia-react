module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'Items',
			[
				{
					name: 'Training Onehanded Sword',
					ownerId: 1,
					ownerType: 'player',
					templateId: 1,
					templateType: 'weapon',
					location: 'inventory',
					keywords: ['training onehanded sword', 'training onehanded', 'onehanded sword', 'training', 'onehanded', 'sword'],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Leather Armor',
					ownerId: 1,
					ownerType: 'player',
					templateId: 1,
					templateType: 'armor',
					location: 'inventory',
					keywords: ['leather armor', 'leather', 'armor'],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('Items', null, {})
	},
}
