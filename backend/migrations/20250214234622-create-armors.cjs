'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Armors', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			itemId: { type: Sequelize.INTEGER, allowNull: false, unique: true, references: { model: 'Items', key: 'id' } },
			templateId: { type: Sequelize.INTEGER },

			name: { type: Sequelize.STRING },
			armorValues: { type: Sequelize.JSONB },
			slot: { type: Sequelize.STRING },
			material: { type: Sequelize.STRING },
			bonuses: { type: Sequelize.JSONB, defaultValue: {} },
			weight: { type: Sequelize.INTEGER },
			sellValue: { type: Sequelize.INTEGER },
			//If ownerType is player, location is among these: rightHand, leftHand, inventory, {slotName}
			location: { type: Sequelize.STRING },
			keywords: { type: Sequelize.ARRAY(Sequelize.STRING) },
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
		await queryInterface.dropTable('Armors')
	},
}
