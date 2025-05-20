'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Players', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			name: { type: Sequelize.STRING },
			level: { type: Sequelize.INTEGER, defaultValue: 1 },
			raceId: { type: Sequelize.INTEGER },
			classId: { type: Sequelize.INTEGER },

			attributes: { type: Sequelize.JSONB },
			stats: { type: Sequelize.JSONB },
			offenses: { type: Sequelize.JSONB },
			defenses: { type: Sequelize.JSONB },
			resistances: { type: Sequelize.JSONB },
			progress: { type: Sequelize.JSONB },

			experience: { type: Sequelize.INTEGER },
			gold: { type: Sequelize.INTEGER },
			skillPoints: { type: Sequelize.INTEGER },
			attributePoints: { type: Sequelize.INTEGER },
			strength: { type: Sequelize.INTEGER },

			x: { type: Sequelize.INTEGER },
			y: { type: Sequelize.INTEGER },
			z: { type: Sequelize.INTEGER },
			area_id: { type: Sequelize.INTEGER, allowNull: false },
			createdAt: { type: Sequelize.DATE, allowNull: false },
			updatedAt: { type: Sequelize.DATE, allowNull: false },
		})
	},

	async down(queryInterface) {
		await queryInterface.dropTable('Players')
	},
}
