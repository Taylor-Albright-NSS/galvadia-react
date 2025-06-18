import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Npc = sequelize.define(
	'Npc',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		area_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Area', key: 'id' } },
		name: { type: DataTypes.STRING },
		speakInteraction: { type: DataTypes.BOOLEAN },
		behavior: { type: DataTypes.STRING },
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	},
	{
		timestamps: true,
	}
)
