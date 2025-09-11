import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.js'
import { PlayerRace } from './playerRace.js'
import { PlayerClass } from './playerClass.js'

class Player extends Model {
	get levelCalc() {
		const experience = this.experience
		const level = Math.max(Math.floor(Math.sqrt(experience / 100)), 1)
		return level
	}
}
Player.prototype.getAttributes = async function () {
	const playerClass = await this.getPlayerClass()
	const playerRace = await this.getPlayerRace()
	const classRaceAttributes = {}
	// console.log(playerClass.dataValues)
	for (const att in playerClass.dataValues) {
		const validAtts = ['strength', 'dexterity', 'agility', 'constitution', 'intelligence', 'wisdom', 'mysticism']
		if (validAtts.includes(att)) {
			classRaceAttributes[att] = playerClass[att] + playerRace[att] + 100 || 0
		}
	}
	console.log(classRaceAttributes, ' CLASS RACE ATTRIBUTES')
	return classRaceAttributes
}
Player.prototype.getMaxHealth = async function () {
	const playerClass = await this.getPlayerClass()
	const playerRace = await this.getPlayerRace()
	console.log(playerClass.health, ' player class from getMaxHealth')

	const base = playerClass.health + playerRace.health
	const con = this.attributes?.constitution || 0
	// const vigor = this.attributes?.vigor || 0
	const fromCon = con * 4
	// const fromLevel = this.level * 10
	// const fromVigor = vigor * 2

	// const fromEquipment = (await this.getEquippedItems()).reduce((sum, item) => sum + (item.bonuses?.hp || 0), 0)

	// const fromBuffs = (this.buffs || []).reduce((sum, buff) => sum + (buff.hpBonus || 0), 0)

	// return base + fromCon + fromLevel + fromVigor + fromEquipment + fromBuffs
	return base + fromCon
}
Player.prototype.getMaxMana = async function () {
	const playerClass = await this.getPlayerClass()
	const playerRace = await this.getPlayerRace()

	const base = playerClass.mana + playerRace.mana
	const wis = this.attributes?.wisdom || 0
	// const vigor = this.attributes?.vigor || 0
	const fromWis = wis * 4

	// const fromLevel = this.level * 10
	// const fromVigor = vigor * 2
	// const fromEquipment = (await this.getEquippedItems()).reduce((sum, item) => sum + (item.bonuses?.hp || 0), 0)
	// const fromBuffs = (this.buffs || []).reduce((sum, buff) => sum + (buff.hpBonus || 0), 0)
	// return base + fromCon + fromLevel + fromVigor + fromEquipment + fromBuffs

	return base + fromWis
}
Player.prototype.getStats = async function () {
	const maxMana = await this.getMaxMana()
	const maxHealth = await this.getMaxHealth()
	const currentHealth = this.currentHealth
	const currentMana = this.currentMana
	return { maxHealth, maxMana, currentHealth, currentMana }
}

Player.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING },
		level: { type: DataTypes.INTEGER, defaultValue: 1 },
		raceId: { type: DataTypes.INTEGER },
		classId: { type: DataTypes.INTEGER },
		userId: { type: DataTypes.INTEGER },

		baseAttributes: { type: DataTypes.JSONB },
		allocatedAttributes: { type: DataTypes.JSONB },

		healthMax: { type: DataTypes.INTEGER },
		healthCurrent: { type: DataTypes.INTEGER },
		manaMax: { type: DataTypes.INTEGER },
		manaCurrent: { type: DataTypes.INTEGER },
		burden: { type: DataTypes.INTEGER },
		weight: { type: DataTypes.INTEGER },

		offenses: { type: DataTypes.JSONB },
		defenses: { type: DataTypes.JSONB },
		resistances: { type: DataTypes.JSONB },
		progress: { type: DataTypes.JSONB },

		experience: { type: DataTypes.INTEGER, defaultValue: 0 },
		gold: { type: DataTypes.INTEGER, defaultValue: 0 },
		skillPoints: { type: DataTypes.INTEGER, defaultValue: 0 },
		attributePoints: { type: DataTypes.INTEGER, defaultValue: 0 },
		strength: { type: DataTypes.INTEGER },
		x: { type: DataTypes.INTEGER, defaultValue: 0 },
		y: { type: DataTypes.INTEGER, defaultValue: 0 },
		z: { type: DataTypes.INTEGER, defaultValue: 0 },
		s: { type: DataTypes.STRING, defaultValue: 'tutorial' },
		area_id: { type: DataTypes.INTEGER, defaultValue: 1 },
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	},
	{
		sequelize,
		modelName: 'Player',
		hooks: {
			beforeSave(player) {
				player.level = player.levelCalc
			},
			async beforeCreate(player) {
				const race = await PlayerRace.findByPk(player.raceId)
				const charClass = await PlayerClass.findByPk(player.classId)

				if (!race || !charClass) throw new Error('Invalid race or class')

				const keys = new Set([...Object.keys(race.toJSON()), ...Object.keys(charClass.toJSON())])

				const aggregatedAttributes = {}
				const aggregatedStats = {}

				keys.forEach(key => {
					if (['strength', 'dexterity', 'agility', 'constitution', 'intelligence', 'wisdom', 'mysticism'].includes(key)) {
						const raceVal = race[key] || 0
						const classVal = charClass[key] || 0

						if (typeof raceVal === 'number' || typeof classVal === 'number') {
							aggregatedAttributes[key] = (raceVal || 0) + (classVal || 0)
						}
					}
				})
				player.baseAttributes = aggregatedAttributes
				player.allocatedAttributes = { strength: 0, dexterity: 0, agility: 0, constitution: 0, intelligence: 0, wisdom: 0, mysticism: 0 }
				const health = await player.getMaxHealth()
				const mana = await player.getMaxMana()
				player.healthMax = health
				player.manaMax = mana
				player.healthCurrent = health
				player.manaCurrent = mana
				player.burden = 0
				player.weight = 0
			},
		},
	}
)

export default Player
