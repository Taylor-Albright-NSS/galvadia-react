module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'WeaponTemplates',
			[
				{
					id: 1,
					templateType: 'weapon',
					name: 'Training Onehanded Sword',
					damageType: ['slashing', 'piercing'],
					minDamageMin: 3,
					maxDamageMin: 5,
					minDamageMax: 7,
					maxDamageMax: 9,
					bonuses: JSON.stringify({
						attributes: {
							strength: 1,
							dexterity: 1,
							agility: 1,
						},
						skills: {
							onehanded: 1,
						},
					}),
					weight: 10,
					sellValue: 15,
					isTwoHanded: false,
					keywords: ['training onehanded sword', 'onehanded sword', 'sword'],
					description: 'This is a Training Onehanded Sword',
				},
				{
					id: 2,
					templateType: 'weapon',
					name: 'Dagger',
					damageType: ['piercing'],
					minDamageMin: 1,
					maxDamageMin: 2,
					minDamageMax: 3,
					maxDamageMax: 4,
					weight: 13,
					sellValue: 23,
					isTwoHanded: false,
					keywords: ['dagger'],
					description: 'This is a Dagger',
				},
				{
					id: 3,
					templateType: 'weapon',
					name: 'Crossbow',
					description: 'This is a Crossbow',
					damageType: ['piercing'],
					minDamageMin: 1,
					maxDamageMin: 2,
					minDamageMax: 3,
					maxDamageMax: 4,
					weight: 20,
					sellValue: 100,

					keywords: ['crossbow'],
					isTwoHanded: false,
				},
				{
					id: 4,
					templateType: 'weapon',
					name: 'Twohanded Blue Sabre',
					description: 'This is a Twohanded Blue Sabre',
					damageType: ['slashing', 'piercing'],
					minDamageMin: 1,
					maxDamageMin: 2,
					minDamageMax: 3,
					maxDamageMax: 4,
					weight: 25,
					sellValue: 150,

					keywords: ['twohanded', 'blue', 'sabre', 'twohanded blue sabre'],
					isTwoHanded: true,
				},
				{
					id: 5,
					templateType: 'weapon',
					name: 'Twohanded Bastard Sword',
					description: 'This is a Twohanded Bastard Sword',
					damageType: ['slashing', 'piercing'],
					minDamageMin: 1,
					maxDamageMin: 2,
					minDamageMax: 3,
					maxDamageMax: 4,
					weight: 20,
					sellValue: 500,

					keywords: ['twohanded', 'bastard', 'sword', 'twohanded bastard sword', 'twohanded bastard', 'bastard sword', 'twohanded bastard sword'],
					isTwoHanded: true,
				},
				{
					id: 6,
					templateType: 'weapon',
					name: 'Shortsword',
					description: 'A plain Shortsword',
					damageType: ['slashing', 'piercing'],
					minDamageMin: 1,
					maxDamageMin: 2,
					minDamageMax: 3,
					maxDamageMax: 4,
					weight: 15,
					sellValue: 70,

					keywords: ['shortsword', 'sword', 'short', 'short sword'],
					isTwoHanded: false,
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('WeaponTemplates', null, {})
	},
}
