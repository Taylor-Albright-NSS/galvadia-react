'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('PlayerAreas', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			playerId: { type: Sequelize.INTEGER, allowNull: true },
			area_id: { type: Sequelize.INTEGER },
			unlockedDirections: { type: Sequelize.JSON, defaultValue: {} },
			unblockedDirections: { type: Sequelize.JSON, defaultValue: {} },

			createdAt: { type: Sequelize.DATE, allowNull: false },
			updatedAt: { type: Sequelize.DATE, allowNull: false },
		})
	},

	async down(queryInterface) {
		await queryInterface.dropTable('PlayerAreas')
	},
}
