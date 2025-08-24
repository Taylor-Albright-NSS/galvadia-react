'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			// name: { type: Sequelize.STRING, allowNull: true },
			username: { type: Sequelize.STRING, allowNull: false },
			email: { type: Sequelize.STRING, allowNull: false },
			passwordHash: { type: Sequelize.STRING, allowNull: false },
			createdAt: { type: Sequelize.DATE },
			updatedAt: { type: Sequelize.DATE },
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users')
	},
}
