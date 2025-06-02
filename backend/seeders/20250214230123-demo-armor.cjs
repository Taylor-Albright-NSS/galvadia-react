module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'Armors',
			[
				{
					itemId: 2,
					templateId: 1,

					name: 'Leather Armor',
					armorValues: JSON.stringify({
						slashing: 3,
						piercing: 2,
						blunt: 1,
					}),
					slot: 'chest',
					material: 'leather',
					bonuses: JSON.stringify({
						attributes: {
							dexterity: 1,
							constitution: 1,
						},
					}),
					weight: 5,
					sellValue: 50,

					location: 'area',
					keywords: ['leather armor', 'leather', 'armor'],
					description: 'A Leather Chest Piece',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('Armors', null, {})
	},
}
