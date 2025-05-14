const { Sequelize } = require('sequelize')

module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'LootTables',
			[
				{
					id: 1,
					templateId: 1,
					templateType: 'weapon',
					enemyTypeId: 1,
					dropChance: 10,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 2,
					templateId: 2,
					templateType: 'weapon',
					enemyTypeId: 1,
					dropChance: 90,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 3,
					templateId: 1,
					templateType: 'weapon',
					enemyTypeId: 2,
					dropChance: 20,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('LootTables', null, {})
	},
}
