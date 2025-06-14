'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Npcs', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			area_id: { type: Sequelize.INTEGER, allowNull: false },
			name: { type: Sequelize.STRING, allowNull: false },
			speakInteraction: { type: Sequelize.BOOLEAN },
			createdAt: { type: Sequelize.DATE, allowNull: false },
			updatedAt: { type: Sequelize.DATE, allowNull: false },
		})
	},

	async down(queryInterface) {
		await queryInterface.dropTable('Npcs')
	},
}
