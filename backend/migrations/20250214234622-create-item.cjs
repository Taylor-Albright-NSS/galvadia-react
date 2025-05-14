'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Items', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			name: { type: Sequelize.STRING },
			ownerId: { type: Sequelize.INTEGER },
			ownerType: { type: Sequelize.STRING },
			templateId: { type: Sequelize.INTEGER },
			templateType: { type: Sequelize.STRING },

			location: { type: Sequelize.STRING },

			createdAt: { type: Sequelize.DATE, allowNull: false },
			updatedAt: { type: Sequelize.DATE, allowNull: false },
		})
	},

	async down(queryInterface) {
		await queryInterface.dropTable('Items')
	},
}
