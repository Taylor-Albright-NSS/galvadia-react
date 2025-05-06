const { Sequelize } = require('sequelize')

module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'EnemyTypes',
			[
				{
					id: 1,
					name: 'Lesser Elemental',
					minLevel: 1,
					maxLevel: 5,
					baseHealth: 10,
					baseDamage: 1,
					baseExperience: 5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 2,
					name: 'Kobold',
					minLevel: 10,
					maxLevel: 15,
					baseHealth: 30,
					baseDamage: 20,
					baseExperience: 100,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('EnemyTypes', null, {})
	},
}
