'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Players', {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
			name: { type: Sequelize.STRING },
			level: { type: Sequelize.INTEGER, defaultValue: 1 },
			raceId: { type: Sequelize.INTEGER },
			classId: { type: Sequelize.INTEGER },
			userId: { type: Sequelize.INTEGER },

			attributes: { type: Sequelize.JSONB },
			stats: { type: Sequelize.JSONB },
			offenses: { type: Sequelize.JSONB },
			defenses: { type: Sequelize.JSONB },
			resistances: { type: Sequelize.JSONB },
			progress: { type: Sequelize.JSONB },

			experience: { type: Sequelize.INTEGER, defaultValue: 0 },
			gold: { type: Sequelize.INTEGER, defaultValue: 0 },
			skillPoints: { type: Sequelize.INTEGER, defaultValue: 0 },
			attributePoints: { type: Sequelize.INTEGER, defaultValue: 0 },
			strength: { type: Sequelize.INTEGER, defaultValue: 0 },

			x: { type: Sequelize.INTEGER, defaultValue: 0 },
			y: { type: Sequelize.INTEGER, defaultValue: 0 },
			z: { type: Sequelize.INTEGER, defaultValue: 0 },
			s: { type: Sequelize.STRING, defaultValue: 'tutorial' },
			area_id: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
			createdAt: { type: Sequelize.DATE, allowNull: false },
			updatedAt: { type: Sequelize.DATE, allowNull: false },
		})
	},

	async down(queryInterface) {
		await queryInterface.dropTable('Players')
	},
}
