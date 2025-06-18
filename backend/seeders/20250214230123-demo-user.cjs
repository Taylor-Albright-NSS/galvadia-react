module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					name: 'Taylor',
					username: 'Mudfobby',
					email: 't@gmail.com',
					password: 'password',
					passwordHash: 'password',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Kyle',
					username: 'Carcass',
					email: 'k@gmail.com',
					password: 'password',
					passwordHash: 'password',
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
