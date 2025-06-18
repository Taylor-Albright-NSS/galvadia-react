'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('QuestItemTemplates', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			name: { type: Sequelize.STRING },
			questId: { type: Sequelize.INTEGER },
			ownerId: { type: Sequelize.INTEGER },
			templateType: { type: Sequelize.STRING },
			ownerType: { type: Sequelize.STRING },
			location: { type: Sequelize.STRING },
			keywords: { type: Sequelize.ARRAY(Sequelize.STRING) },
			description: { type: Sequelize.STRING },

			createdAt: { type: Sequelize.DATE, allowNull: false },
			updatedAt: { type: Sequelize.DATE, allowNull: false },
		})
	},

	async down(queryInterface) {
		await queryInterface.dropTable('QuestItemTemplates')
	},
}
