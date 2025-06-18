module.exports = {
	up: async queryInterface => {
		// await queryInterface.bulkInsert('QuestItems', [], {})
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('QuestItems', null, {})
	},
}
