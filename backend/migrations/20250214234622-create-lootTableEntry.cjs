'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('LootTableEntries', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			lootTableId: { type: Sequelize.INTEGER },
			templateId: { type: Sequelize.INTEGER }, //templateId and templateType must be used together when querying
			templateType: { type: Sequelize.STRING }, //templateId and templateType must be used together when querying

			dropChance: { type: Sequelize.INTEGER },

			createdAt: { type: Sequelize.DATE },
			updatedAt: { type: Sequelize.DATE },
		})
	},

	async down(queryInterface) {
		await queryInterface.dropTable('LootTableEntries')
	},
}
