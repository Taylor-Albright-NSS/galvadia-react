'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Keywords', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			area_id: { type: Sequelize.INTEGER, allowNull: false },
			actionAreaId: { type: Sequelize.INTEGER },
			npcId: { type: Sequelize.INTEGER },
			special: { type: Sequelize.JSON },
			actionVerb: { type: Sequelize.STRING },
			name: { type: Sequelize.STRING },
			refName: { type: Sequelize.STRING },
			color: { type: Sequelize.STRING },
			description: { type: Sequelize.ARRAY(Sequelize.STRING) },
			activateDescription: { type: Sequelize.ARRAY(Sequelize.STRING) },
			alreadyActivatedDescription: { type: Sequelize.ARRAY(Sequelize.STRING) },
			methodCode: { type: Sequelize.STRING },
			createdAt: { type: Sequelize.DATE, allowNull: false },
			updatedAt: { type: Sequelize.DATE, allowNull: false },
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Keywords')
	},
}
