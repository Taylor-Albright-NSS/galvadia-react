'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('LootTables', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},

			templateId: { type: Sequelize.INTEGER },
			templateType: { type: Sequelize.STRING },
			enemyTypeId: { type: Sequelize.INTEGER },
			dropChance: { type: Sequelize.INTEGER },

			createdAt: {
				type: Sequelize.DATE,
			},
			updatedAt: {
				type: Sequelize.DATE,
			},
		})
	},

	async down(queryInterface) {
		await queryInterface.dropTable('LootTables')
	},
}
