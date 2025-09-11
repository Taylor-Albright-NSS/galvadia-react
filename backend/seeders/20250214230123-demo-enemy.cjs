const { Sequelize } = require('sequelize')

module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'Enemies',
			[
				{
					enemyTypeId: 1,
					area_id: 1,

					name: 'Mudling',
					level: 3,
					health: 10,
					offenses: JSON.stringify({
						attackPower: 1,
						attackSpeed: 6,
						accuracy: 0,
					}),
					defenses: JSON.stringify({
						slashingArmor: 1,
						piercingArmor: 1,
						bluntArmor: 1,
						dodge: 5,
					}),
					resistances: JSON.stringify({}),
					experience: 250,
					loot: Sequelize.literal('ARRAY[]::JSONB[]'),
					playerCombatIds: Sequelize.literal('ARRAY[]::INTEGER[]'),

					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					enemyTypeId: 1,
					area_id: 12,

					name: 'Training Dummy',
					level: 99,
					health: 99999,
					offenses: JSON.stringify({
						attackPower: 0,
						attackSpeed: 0,
						accuracy: 0,
					}),
					defenses: JSON.stringify({
						slashingArmor: 0,
						piercingArmor: 0,
						bluntArmor: 0,
						dodge: 0,
					}),
					resistances: JSON.stringify({}),
					experience: 0,
					loot: Sequelize.literal('ARRAY[]::JSONB[]'),
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
