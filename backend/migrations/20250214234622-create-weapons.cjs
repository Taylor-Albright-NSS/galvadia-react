'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Weapons', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			itemId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: true,
				references: {
					model: 'Items',
					key: 'id',
				},
			},
			templateId: { type: Sequelize.INTEGER },
			ownerId: { type: Sequelize.INTEGER },
			ownerType: { type: Sequelize.STRING },

			name: { type: Sequelize.STRING },
			damageType: { type: Sequelize.ARRAY(Sequelize.DataTypes.STRING) },
			minDamage: { type: Sequelize.INTEGER },
			maxDamage: { type: Sequelize.INTEGER },
			bonuses: { type: Sequelize.JSONB },
			weight: { type: Sequelize.INTEGER },
			sellValue: { type: Sequelize.INTEGER },
			isTwoHanded: { type: Sequelize.BOOLEAN },
			description: { type: Sequelize.STRING },

			location: { type: Sequelize.STRING },
			keywords: { type: Sequelize.ARRAY(Sequelize.DataTypes.STRING) },
			description: { type: Sequelize.TEXT },
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
		await queryInterface.dropTable('Weapons')
	},
}
