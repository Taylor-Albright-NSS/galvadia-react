import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.js'

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
		level: { type: DataTypes.INTEGER },
		raceId: { type: DataTypes.INTEGER },
		classId: { type: DataTypes.INTEGER },

		attributes: { type: DataTypes.JSONB },
		stats: { type: DataTypes.JSONB },
		offenses: { type: DataTypes.JSONB },
		defenses: { type: DataTypes.JSONB },
		resistances: { type: DataTypes.JSONB },
		progress: { type: DataTypes.JSONB },

		experience: { type: DataTypes.INTEGER },
		gold: { type: DataTypes.INTEGER },
		skillPoints: { type: DataTypes.INTEGER },
		attributePoints: { type: DataTypes.INTEGER },
		strength: { type: DataTypes.INTEGER },
		x: { type: DataTypes.INTEGER },
		y: { type: DataTypes.INTEGER },
		z: { type: DataTypes.INTEGER },
		s: { type: DataTypes.STRING },
		area_id: { type: DataTypes.INTEGER },
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
		},
	}
)

export default Player

//OLD WAY OF INITIALIZING MODEL
// export const Player = sequelize.define('Player', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//   },
//   level: {
//     type: DataTypes.INTEGER
//   },
//   x: {
//     type: DataTypes.STRING,
//   },
//   y: {
//     type: DataTypes.STRING,
//   },
//   z: {
//     type: DataTypes.STRING,
//   },
//   area_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   level: {
//     type: DataTypes.INTEGER,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// }, {
//   timestamps: true,
// });
