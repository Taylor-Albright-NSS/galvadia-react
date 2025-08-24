const human = {
	name: 'Human',
	attributes: { str: 1, dex: 1, agi: 1, con: 2, int: 1, wis: 1, mys: 1 },
	skills: ['Bartering', 'Toughness'],
	description: 'The Human is a Human',
}
const elf = {
	name: 'Elf',
	attributes: { str: 0, dex: 2, agi: 0, con: 1, int: 3, wis: 2, mys: 2 },
	skills: ['Magic Spell Use'],
	description: 'The Elf is and Elf',
}

export const allRaces = {
	human,
	elf,
}
