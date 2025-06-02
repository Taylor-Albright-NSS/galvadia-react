'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('WeaponTemplates', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			templateType: { type: Sequelize.STRING },
			name: { type: Sequelize.STRING },
			damageTypes: { type: Sequelize.JSONB },
			minDamageMin: { type: Sequelize.INTEGER },
			maxDamageMin: { type: Sequelize.INTEGER },
			minDamageMax: { type: Sequelize.INTEGER },
			maxDamageMax: { type: Sequelize.INTEGER },
			bonuses: { type: Sequelize.JSONB },
			weight: { type: Sequelize.INTEGER },
			sellValue: { type: Sequelize.INTEGER },
			weaponSkill: { type: Sequelize.STRING },
			keywords: { type: Sequelize.ARRAY(Sequelize.DataTypes.STRING) },
			description: { type: Sequelize.STRING },

			createdAt: {
				type: Sequelize.DATE,
			},
			updatedAt: {
				type: Sequelize.DATE,
			},
		})
	},

	async down(queryInterface) {
		await queryInterface.dropTable('WeaponTemplate')
	},
}
