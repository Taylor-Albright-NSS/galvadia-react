'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('PlayerRaces', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			name: { type: Sequelize.STRING },
			strength: { type: Sequelize.INTEGER },
			dexterity: { type: Sequelize.INTEGER },
			agility: { type: Sequelize.INTEGER },
			constitution: { type: Sequelize.INTEGER },
			intelligence: { type: Sequelize.INTEGER },
			wisdom: { type: Sequelize.INTEGER },
			mysticism: { type: Sequelize.INTEGER },

			createdAt: { type: Sequelize.DATE, allowNull: false },
			updatedAt: { type: Sequelize.DATE, allowNull: false },
		})
	},

	async down(queryInterface) {
		await queryInterface.dropTable('PlayerRaces')
	},
}
