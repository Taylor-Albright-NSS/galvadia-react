'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Areas', {
			id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
			name: { type: Sequelize.STRING },
			heading: { type: Sequelize.STRING, allowNull: true },
			headingColor: { type: Sequelize.STRING },
			description: { type: Sequelize.TEXT },
			exitsBool: { type: Sequelize.JSON, defaultValue: {} },
			x: { type: Sequelize.INTEGER },
			y: { type: Sequelize.INTEGER },
			z: { type: Sequelize.INTEGER },
			s: { type: Sequelize.STRING },
			createdAt: { type: Sequelize.DATE },
			updatedAt: { type: Sequelize.DATE },
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Areas')
	},
}
