module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'PlayerClasses',
			[
				{
					name: 'Warrior',
					strength: 10,
					dexterity: 2,
					agility: 1,
					constitution: 12,
					intelligence: 1,
					wisdom: 1,
					mysticism: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Wizard',
					strength: 1,
					dexterity: 2,
					agility: 1,
					constitution: 1,
					intelligence: 12,
					wisdom: 12,
					mysticism: 8,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('PlayerClasses', null, {})
	},
}
