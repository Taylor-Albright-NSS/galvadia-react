import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.js'

export class LootTableEntry extends Model {}

LootTableEntry.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		lootTableId: { type: DataTypes.INTEGER },
		templateId: { type: DataTypes.INTEGER }, //templateId and templateType must be used together when querying
		templateType: { type: DataTypes.STRING }, //templateId and templateType must be used together when querying

		dropChance: { type: DataTypes.INTEGER },

		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	},
	{
		sequelize,
		modelName: 'LootTableEntry',
		timestamps: true,
	}
)

export default LootTableEntry
