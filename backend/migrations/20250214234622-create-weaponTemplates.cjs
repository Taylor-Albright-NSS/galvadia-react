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
			damageType: { type: Sequelize.ARRAY(Sequelize.DataTypes.STRING) },
			minDamageMin: { type: Sequelize.INTEGER },
			maxDamageMin: { type: Sequelize.INTEGER },
			minDamageMax: { type: Sequelize.INTEGER },
			maxDamageMax: { type: Sequelize.INTEGER },
			weight: { type: Sequelize.INTEGER },
			sellValue: { type: Sequelize.INTEGER },
			isTwoHanded: { type: Sequelize.BOOLEAN },
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
