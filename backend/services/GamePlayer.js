// services/game/GamePlayer.js

import { randomNumberRange } from '../utils/itemUtils.js'
import { generatePreposition, generateSwingVerb } from '../utils/playerUtils.js'

export class GamePlayer {
	constructor(player, { buffs = [], weapons = [], skills = {} } = {}) {
		this.player = player
		this.buffs = buffs
		this.weapons = weapons
		this.skills = skills
	}

	//botMultiplier is for weapon skill. Add that in once skills are implemented
	// const lowDamage = Math.ceil(attackPower * (botMultiplier * botDamage));
	// const highDamage = Math.ceil(attackPower * (topMultiplier * topDamage));
	// const baseDamage = Math.max(1, randomNumberRange(lowDamage, highDamage))

	get baseStats() {
		return {
			strength: this.player.strength || 1,
			dexterity: this.player.dexterity || 1,
			agility: this.player.agility || 1,
		}
	}
	rawDamage(weapon) {
		const { minDamage, maxDamage } = weapon.Weapon
		const lowDamage = Math.ceil(this.baseStats.strength * minDamage)
		const highDamage = Math.ceil(this.baseStats.strength * maxDamage)
		const baseDamage = Math.max(1, randomNumberRange(lowDamage, highDamage))
		return Math.ceil(baseDamage)
	}

	armorPenetrationValue(damageType) {
		return this.player.offenses?.[`${damageType}Penetration`] || 0
	}
	calculateDamageAgainstEnemy(enemy, weapon) {
		console.log(weapon, ' weapon')
		const damageTypesArray = Object.keys(weapon.Weapon.damageTypes) // ['slashing', 'piercing', 'blunt'] -- ARRAY
		const damageType = damageTypesArray[randomNumberRange(0, damageTypesArray.length - 1)] // 'slashing' -- STRING

		const playerPenetration = this.armorPenetrationValue(damageType) // 1 or 5 or 10, etc -- INTEGER
		const enemyArmorBefore = enemy.armorValue(damageType) //1 or 5 or 10 -- INTEGER
		const enemyArmorAfter = Math.max(enemyArmorBefore - playerPenetration, 0) // 0 or 4 or 9 -- INTEGER

		const playerRawDamage = this.rawDamage(weapon)
		const playerActualDamage = Math.max(playerRawDamage - enemyArmorAfter, 0) // 42, 89 -- INTEGER
		const playerBlockedDamage = playerRawDamage - playerActualDamage
		console.log(playerRawDamage, ' playerRawDamage')
		console.log(playerActualDamage, ' playerActualDamage')
		console.log(playerBlockedDamage, ' playerBlockedDamage')

		const damageObject = {
			weapon,
			enemy,
			damageType,
			swingVerb: generateSwingVerb(damageType),
			preposition: generatePreposition(damageType),
			actualDamage: playerActualDamage,
			blockedDamage: playerBlockedDamage,
		}

		return damageObject
	}
	// getModifiedStat(statName) {
	// 	let value = this.baseStats[statName] || 0
	// 	for (const buff of this.buffs) {
	// 		value += buff.getStatBonus(statName)
	// 	}
	// 	return value
	// }
}
