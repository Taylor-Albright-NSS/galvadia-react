'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Enemies', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			area_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			level: { type: Sequelize.INTEGER },
			health: { type: Sequelize.INTEGER },
			damage: { type: Sequelize.INTEGER },
			experience: { type: Sequelize.INTEGER },

			playerCombatIds: {
				type: Sequelize.ARRAY(Sequelize.DataTypes.INTEGER),
				defaultValue: [],
			},
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

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Enemies')
	},
}
