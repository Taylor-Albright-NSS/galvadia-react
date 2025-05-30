'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('EnemyTypes', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			lootTableId: { type: Sequelize.INTEGER },
			name: { type: Sequelize.STRING },
			minLevel: { type: Sequelize.INTEGER },
			maxLevel: { type: Sequelize.INTEGER },
			baseHealth: { type: Sequelize.INTEGER },
			baseDamage: { type: Sequelize.INTEGER },
			baseExperience: { type: Sequelize.INTEGER },

			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		})
	},

	async down(queryInterface) {
		await queryInterface.dropTable('EnemyTypes')
	},
}
