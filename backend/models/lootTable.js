import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.js'

export class LootTable extends Model {}

LootTable.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING }, //Mudling, Waterling, Kobold, Orc, etc
		// templateId: { type: DataTypes.INTEGER },
		// templateType: { type: DataTypes.STRING },
		// enemyTypeId: { type: DataTypes.INTEGER },
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	},
	{
		sequelize,
		modelName: 'LootTable',
		timestamps: true,
		hooks: {},
	}
)

export default LootTable
