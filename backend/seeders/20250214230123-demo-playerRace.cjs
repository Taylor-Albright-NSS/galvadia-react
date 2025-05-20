module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'PlayerRaces',
			[
				{
					name: 'Human',
					strength: 3,
					dexterity: 3,
					agility: 3,
					constitution: 3,
					intelligence: 3,
					wisdom: 3,
					mysticism: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Elf',
					strength: 1,
					dexterity: 1,
					agility: 5,
					constitution: 1,
					intelligence: 10,
					wisdom: 10,
					mysticism: 7,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('PlayerRaces', null, {})
	},
}
