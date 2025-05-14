const { Sequelize } = require('sequelize')

module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'LootTableEntries',
			[
				{
					lootTableId: 1,
					templateId: 1, //templateId and templateType must be used together when querying
					templateType: 'weapon', //templateId and templateType must be used together when querying

					dropChance: 90,

					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					lootTableId: 1,
					templateId: 2, //templateId and templateType must be used together when querying
					templateType: 'weapon', //templateId and templateType must be used together when querying

					dropChance: 50,

					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					lootTableId: 1,
					templateId: 3, //templateId and templateType must be used together when querying
					templateType: 'weapon', //templateId and templateType must be used together when querying

					dropChance: 10,

					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('LootTableEntries', null, {})
	},
}
