'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('ArmorTemplates', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			templateType: { type: Sequelize.STRING },
			name: { type: Sequelize.STRING },
			armorValues: { type: Sequelize.JSONB },
			bonuses: { type: Sequelize.JSONB },
			slot: { type: Sequelize.STRING },
			material: { type: Sequelize.STRING },
			weight: { type: Sequelize.INTEGER },
			sellValue: { type: Sequelize.INTEGER },
			keywords: { type: Sequelize.ARRAY(Sequelize.DataTypes.STRING) },
			description: { type: Sequelize.STRING },

			createdAt: { type: Sequelize.DATE },
			updatedAt: { type: Sequelize.DATE },
		})
	},

	async down(queryInterface) {
		await queryInterface.dropTable('ArmorTemplates')
	},
}
