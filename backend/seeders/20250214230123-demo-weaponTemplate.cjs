module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'WeaponTemplates',
			[
				{
					id: 1,
					templateType: 'weapon',
					name: 'Training Onehanded Sword',
					damageTypes: JSON.stringify({
						slashing: 0,
						piercing: 0,
						blunt: 0,
					}),
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
					damageTypes: JSON.stringify({
						slashing: 0,
						piercing: 0,
						blunt: 0,
					}),
					minDamageMin: 1,
					maxDamageMin: 2,
					minDamageMax: 3,
					maxDamageMax: 4,
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
					damageTypes: JSON.stringify({
						slashing: 0,
						piercing: 0,
						blunt: 0,
					}),
					description: 'This is a Crossbow',
					minDamageMin: 1,
					maxDamageMin: 2,
					minDamageMax: 3,
					maxDamageMax: 4,
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
					weight: 20,
					sellValue: 100,

					keywords: ['crossbow'],
					isTwoHanded: false,
				},
				{
					id: 4,
					templateType: 'weapon',
					name: 'Twohanded Blue Sabre',
					damageTypes: JSON.stringify({
						slashing: 0,
						piercing: 0,
						blunt: 0,
					}),
					description: 'This is a Twohanded Blue Sabre',
					minDamageMin: 1,
					maxDamageMin: 2,
					minDamageMax: 3,
					maxDamageMax: 4,
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
					weight: 25,
					sellValue: 150,

					keywords: ['twohanded', 'blue', 'sabre', 'twohanded blue sabre'],
					isTwoHanded: true,
				},
				{
					id: 5,
					templateType: 'weapon',
					name: 'Twohanded Bastard Sword',
					damageTypes: JSON.stringify({
						slashing: 0,
						piercing: 0,
						blunt: 0,
					}),
					description: 'This is a Twohanded Bastard Sword',
					minDamageMin: 1,
					maxDamageMin: 2,
					minDamageMax: 3,
					maxDamageMax: 4,
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
					weight: 20,
					sellValue: 500,

					keywords: ['twohanded', 'bastard', 'sword', 'twohanded bastard sword', 'twohanded bastard', 'bastard sword', 'twohanded bastard sword'],
					isTwoHanded: true,
				},
				{
					id: 6,
					templateType: 'weapon',
					name: 'Shortsword',
					damageTypes: JSON.stringify({
						slashing: 0,
						piercing: 0,
						blunt: 0,
					}),
					description: 'A plain Shortsword',
					minDamageMin: 1,
					maxDamageMin: 2,
					minDamageMax: 3,
					maxDamageMax: 4,
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
