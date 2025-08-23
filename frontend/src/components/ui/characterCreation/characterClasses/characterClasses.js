const attributesFighter = { name: 'Fighter', str: 10, dex: 2, agi: 2, con: 8, int: 1, wis: 1, mys: 1 }
const skillsFighter = ['Two Handed', 'Toughness']
const abilitiesFighter = ['Ripslash', 'Cyclone', 'Cataclysm']
const descriptionFighter = 'The berserker is a battle-hardened warrior'

const berserker = {
	name: 'Berserker',
	attributes: { str: 10, dex: 2, agi: 2, con: 8, int: 1, wis: 1, mys: 1 },
	skills: ['Two Handed', 'Toughness'],
	abilities: ['Ripslash', 'Cyclone', 'Cataclysm'],
	description: 'The berserker is a battle-hardened warrior',
}
const fighter = {
	name: 'Fighter',
	attributes: { str: 7, dex: 4, agi: 4, con: 5, int: 2, wis: 2, mys: 2 },
	skills: ['Two Handed', 'Toughness'],
	abilities: ['Ripslash', 'Cyclone', 'Cataclysm'],
	description: 'The berserker is a battle-hardened warrior',
}

export const allClasses = {
	berserker,
	fighter,
}
