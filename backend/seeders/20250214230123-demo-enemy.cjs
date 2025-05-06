const { Sequelize } = require('sequelize')

module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'Enemies',
			[
				{
					id: 1,
					area_id: 1,
					name: 'Goblin',
					level: 9,
					health: 10,
					damage: 999,
					experience: 250,
					playerCombatIds: Sequelize.literal('ARRAY[]::INTEGER[]'),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('Enemies', null, {})
	},
}
