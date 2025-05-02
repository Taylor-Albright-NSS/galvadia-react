// services/game/GamePlayer.js

export class GamePlayer {
	constructor(player, { buffs = [], equipment = {}, skills = {} } = {}) {
		this.player = player
		this.buffs = buffs
		this.equipment = equipment
		this.skills = skills
	}

	get baseStats() {
		// Imagine these are stored somewhere in player or its relations
		return {
			strength: this.player.strength || 10,
			dexterity: this.player.dexterity || 10,
			agility: this.player.agility || 10,
		}
	}

	getModifiedStat(statName) {
		let value = this.baseStats[statName] || 0
		for (const buff of this.buffs) {
			value += buff.getStatBonus(statName)
		}
		return value
	}
}
