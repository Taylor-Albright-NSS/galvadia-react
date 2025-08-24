const bcrypt = require('bcrypt')
module.exports = {
	up: async queryInterface => {
		const hash = await bcrypt.hash('password', 10)
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					// name: 'Taylor',
					username: 'mudfobby',
					email: 't@gmail.com',
					passwordHash: hash,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					// name: 'Kyle',
					username: 'carcass',
					email: 'k@gmail.com',
					passwordHash: hash,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		// Undo the seed by deleting all players
		await queryInterface.bulkDelete('Users', null, {})
	},
}
