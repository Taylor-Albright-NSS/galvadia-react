'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Enemies', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			enemyTypeId: { type: Sequelize.INTEGER },
			area_id: { type: Sequelize.INTEGER, allowNull: false },

			name: { type: Sequelize.STRING, allowNull: false },
			level: { type: Sequelize.INTEGER },
			health: { type: Sequelize.INTEGER },
			offenses: { type: Sequelize.JSONB },
			defenses: { type: Sequelize.JSONB },
			resistances: { type: Sequelize.JSONB },
			experience: { type: Sequelize.INTEGER },
			loot: { type: Sequelize.ARRAY(Sequelize.JSONB) },
			playerCombatIds: { type: Sequelize.ARRAY(Sequelize.DataTypes.INTEGER), defaultValue: [] },

			createdAt: { type: Sequelize.DATE, allowNull: false },
			updatedAt: { type: Sequelize.DATE, allowNull: false },
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Enemies')
	},
}
