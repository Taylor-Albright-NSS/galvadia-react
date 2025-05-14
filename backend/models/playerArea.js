import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.js'

export class PlayerArea extends Model {}

PlayerArea.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		playerId: { type: DataTypes.INTEGER },
		area_id: { type: DataTypes.INTEGER },
		unlockedDirections: { type: DataTypes.JSON, defaultValue: {} },
		unblockedDirections: { type: DataTypes.JSON, defaultValue: {} },

		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	},
	{
		sequelize,
		timestamps: true,
		modelName: 'PlayerArea',
	}
)
