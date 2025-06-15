'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('QuestItems', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			name: { type: Sequelize.STRING },
			itemId: { type: Sequelize.INTEGER },
			templateId: { type: Sequelize.INTEGER },
			questId: { type: Sequelize.INTEGER },
			ownerId: { type: Sequelize.INTEGER },
			ownerType: { type: Sequelize.STRING },
			location: { type: Sequelize.STRING },
			keywords: { type: Sequelize.ARRAY(Sequelize.STRING) },
			description: { type: Sequelize.STRING },

			createdAt: { type: Sequelize.DATE, allowNull: false },
			updatedAt: { type: Sequelize.DATE, allowNull: false },
		})
	},

	async down(queryInterface) {
		await queryInterface.dropTable('QuestItems')
	},
}
