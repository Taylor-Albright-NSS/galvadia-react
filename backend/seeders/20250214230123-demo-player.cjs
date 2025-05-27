module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'Players',
			[
				{
					id: 1,
					name: 'John Doe',
					area_id: 1,
					raceId: 1,
					classId: 1,

					attributes: JSON.stringify({
						strength: 0,
						dexterity: 0,
						agility: 0,
						constitution: 0,
						intelligence: 0,
						wisdom: 0,
						mysticism: 0,
					}),
					stats: JSON.stringify({
						currentHealth: 0,
						maxHealth: 0,
						currentMana: 0,
						maxMana: 0,
						burden: 0,
						weight: 0,
					}),
					offenses: JSON.stringify({
						attackPower: 0,
						attackSpeed: 0,
						accuracy: 0,
						slashingPenetration: 1,
						piercingPenetration: 1,
						bluntPenetration: 1,
						magicPower: 0,
						mysticPower: 0,
					}),
					defenses: JSON.stringify({
						slashingArmor: 0,
						piercingArmor: 0,
						bluntArmor: 0,
						dodge: 0,
					}),
					resistances: JSON.stringify({}),
					progress: JSON.stringify({}),

					level: 1,
					experience: 0,
					gold: 0,
					skillPoints: 0,
					attributePoints: 0,
					strength: 10,
					x: 0,
					y: 0,
					z: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 2,
					name: 'Jane Smith',
					area_id: 1,
					raceId: 2,
					classId: 2,

					attributes: JSON.stringify({
						strength: 0,
						dexterity: 0,
						agility: 0,
						constitution: 0,
						intelligence: 0,
						wisdom: 0,
						mysticism: 0,
					}),
					stats: JSON.stringify({
						currentHealth: 0,
						maxHealth: 0,
						currentMana: 0,
						maxMana: 0,
						burden: 0,
						weight: 0,
					}),
					offenses: JSON.stringify({
						attackPower: 0,
						attackSpeed: 0,
						accuracy: 0,
						magicPower: 0,
						mysticPower: 0,
					}),
					defenses: JSON.stringify({
						slashing: 0,
						piercing: 0,
						blunt: 0,
						dodge: 0,
					}),
					resistances: JSON.stringify({}),
					progress: JSON.stringify({}),

					level: 1,
					experience: 0,
					gold: 0,
					skillPoints: 0,
					attributePoints: 0,
					strength: 100,
					x: 0,
					y: 0,
					z: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		// Undo the seed by deleting all players
		await queryInterface.bulkDelete('Players', null, {})
	},
}
