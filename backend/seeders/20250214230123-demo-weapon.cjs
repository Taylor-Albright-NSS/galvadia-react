module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'Weapons',
			[
				{
					itemId: 1,
					templateId: 1,
					ownerId: 1,
					ownerType: 'player',

					name: 'Training Onehanded Sword',
					damageTypes: JSON.stringify({
						slashing: 0,
						piercing: 0,
						blunt: 0,
					}),
					minDamage: 3,
					maxDamage: 5,
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
					sellValue: 50,
					isTwoHanded: false,

					location: 'inventory',
					keywords: ['training', 'onehanded', 'sword', 'training onehanded', 'onehanded sword', 'training onehanded sword'],
					description: 'A Training Onehanded Sword',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// {
				// 	templateId: 2,
				// 	name: 'Dagger',
				// 	ownerId: 1,
				// 	ownerType: 'area',
				// 	location: null,

				// 	description: 'A Dagger',
				// 	damageType: ['piercing'],
				// 	minDamage: 1,
				// 	maxDamage: 3,
				// 	weight: 13,
				// 	sellValue: 23,

				// 	keywords: ['dagger'],
				// 	isTwoHanded: false,
				// 	createdAt: new Date(),
				// 	updatedAt: new Date(),
				// },
				// {
				// 	templateId: 3,
				// 	name: 'Crossbow',
				// 	ownerId: 2,
				// 	ownerType: 'area',
				// 	location: null,

				// 	description: 'This is a Crossbow',
				// 	damageType: ['piercing'],
				// 	minDamage: 4,
				// 	maxDamage: 8,
				// 	weight: 20,
				// 	sellValue: 100,

				// 	keywords: ['crossbow'],
				// 	isTwoHanded: false,
				// 	createdAt: new Date(),
				// 	updatedAt: new Date(),
				// },
				// {
				// 	templateId: 4,
				// 	name: 'Twohanded Blue Sabre',
				// 	ownerId: 2,
				// 	ownerType: 'area',
				// 	location: null,

				// 	description: 'This is a Twohanded Blue Sabre',
				// 	damageType: ['slashing', 'piercing'],
				// 	minDamage: 10,
				// 	maxDamage: 15,
				// 	weight: 25,
				// 	sellValue: 150,

				// 	keywords: ['twohanded', 'blue', 'sabre', 'twohanded blue sabre'],
				// 	isTwoHanded: true,
				// 	createdAt: new Date(),
				// 	updatedAt: new Date(),
				// },
				// {
				// 	templateId: 5,
				// 	name: 'Twohanded Bastard Sword',
				// 	ownerId: 2,
				// 	ownerType: 'area',
				// 	location: null,

				// 	description: 'This is a Twohanded Bastard Sword',
				// 	damageType: ['slashing', 'piercing'],
				// 	minDamage: 15,
				// 	maxDamage: 25,
				// 	weight: 20,
				// 	sellValue: 500,

				// 	keywords: ['twohanded', 'bastard', 'sword', 'twohanded bastard sword', 'twohanded bastard', 'bastard sword', 'twohanded bastard sword'],
				// 	isTwoHanded: true,
				// 	createdAt: new Date(),
				// 	updatedAt: new Date(),
				// },
				// {
				// 	templateId: 6,
				// 	name: 'Shortsword',
				// 	ownerId: 2,
				// 	ownerType: 'area',
				// 	location: null,

				// 	description: 'A plain Shortsword',
				// 	damageType: ['slashing', 'piercing'],
				// 	minDamage: 6,
				// 	maxDamage: 9,
				// 	weight: 15,
				// 	sellValue: 70,

				// 	keywords: ['shortsword', 'sword', 'short', 'short sword'],
				// 	isTwoHanded: false,
				// 	createdAt: new Date(),
				// 	updatedAt: new Date(),
				// },
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('Weapons', null, {})
	},
}
