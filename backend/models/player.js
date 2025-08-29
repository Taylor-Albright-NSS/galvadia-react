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

Player.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING },
		level: { type: DataTypes.INTEGER, defaultValue: 1 },
		raceId: { type: DataTypes.INTEGER },
		classId: { type: DataTypes.INTEGER },
		userId: { type: DataTypes.INTEGER },

		attributes: { type: DataTypes.JSONB },
		stats: { type: DataTypes.JSONB },
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
				player.level = player.levelCalc // Set the level based on the experience
			},
			async beforeCreate(player) {
				// if (!player.raceId || !player.classId) throw new Error('Player must have race and class selected')

				const race = await PlayerRace.findByPk(player.raceId)
				const charClass = await PlayerClass.findByPk(player.classId)

				console.log(race.toJSON(), ' ++++++++++++++++RACE')
				console.log(charClass.toJSON(), ' ++++++++++++++++CLASS')

				if (!race || !charClass) throw new Error('Invalid race or class')

				// Get all possible attribute keys from both models
				const keys = new Set([...Object.keys(race.toJSON()), ...Object.keys(charClass.toJSON())])

				const aggregatedAttributes = {}

				keys.forEach(key => {
					// Only consider actual attribute fields (not id, name, createdAt, etc.)
					if (['id', 'name', 'createdAt', 'updatedAt'].includes(key)) return

					const raceVal = race[key] || 0
					const classVal = charClass[key] || 0

					// Only aggregate numeric fields
					if (typeof raceVal === 'number' || typeof classVal === 'number') {
						aggregatedAttributes[key] = (raceVal || 0) + (classVal || 0)
					}
				})
				console.log(aggregatedAttributes, ' AGGREGATED ATTRIBUTES')
				player.attributes = aggregatedAttributes
			},
		},
	}
)

export default Player
