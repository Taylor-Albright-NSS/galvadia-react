module.exports = {
	up: async queryInterface => {
		// await queryInterface.bulkInsert(
		// 	'PlayerKeywordActivations',
		// 	[
		// 		// {
		// 		// 	//fountain
		// 		// 	playerId: 1,
		// 		// 	keywordId: 2,
		// 		// 	activated: false,
		// 		// 	requiredItemName: 'Dagger',
		// 		// 	createdAt: new Date(),
		// 		// 	updatedAt: new Date(),
		// 		// },
		// 	],
		// 	{}
		// )
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('PlayerKeywordActivations', null, {})
	},
}
