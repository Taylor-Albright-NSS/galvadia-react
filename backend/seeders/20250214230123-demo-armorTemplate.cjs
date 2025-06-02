module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'ArmorTemplates',
			[
				{
					id: 1,
					templateType: 'armor',
					name: 'Leather Armor',
					armorValues: JSON.stringify({
						slashing: 3,
						piercing: 2,
						blunt: 1,
					}),
					bonuses: JSON.stringify({
						attributes: {
							dexterity: 1,
							constitution: 1,
						},
					}),
					slot: 'chest',
					material: 'leather',
					weight: 5,
					sellValue: 50,
					keywords: ['leather armor', 'leather', 'armor'],
					description: 'A Leather Chest Piece',
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('ArmorTemplates', null, {})
	},
}
