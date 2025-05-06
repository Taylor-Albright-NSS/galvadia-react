// services/game/GamePlayer.js

export class GamePlayer {
	constructor(player, { buffs = [], equipment = {}, skills = {} } = {}) {
		this.player = player
		// this.buffs = buffs
		// this.equipment = equipment
		// this.skills = skills
	}

	get baseStats() {
		return {
			strength: this.player.strength || 1,
		}
	}
	get rawDamage() {
		return Math.ceil(Math.random() * this.baseStats.strength)
	}
	// getModifiedStat(statName) {
	// 	let value = this.baseStats[statName] || 0
	// 	for (const buff of this.buffs) {
	// 		value += buff.getStatBonus(statName)
	// 	}
	// 	return value
	// }
}
