'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('PlayerNpcs', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			name: { type: Sequelize.STRING },
			playerId: { type: Sequelize.INTEGER },
			npcId: { type: Sequelize.INTEGER },
			area_id: { type: Sequelize.INTEGER },
			dialogueStage: { type: Sequelize.INTEGER, allowNull: true },
			dialogueIndex: { type: Sequelize.INTEGER, allowNull: false },
			questStage: { type: Sequelize.INTEGER },
			eventStage: { type: Sequelize.INTEGER },
			createdAt: { type: Sequelize.DATE, allowNull: false },
			updatedAt: { type: Sequelize.DATE, allowNull: false },
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('PlayerNpcs')
	},
}
