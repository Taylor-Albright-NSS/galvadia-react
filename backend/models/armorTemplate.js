import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.js'

export class ArmorTemplate extends Model {}

ArmorTemplate.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		templateType: { type: DataTypes.STRING },
		name: { type: DataTypes.STRING }, // Steel Plate, Leather Chestpiece, etc
		armorValues: { type: DataTypes.JSONB },
		bonuses: { type: DataTypes.JSONB },
		slot: { type: DataTypes.STRING },
		material: { type: DataTypes.STRING },
		weight: { type: DataTypes.INTEGER },
		sellValue: { type: DataTypes.INTEGER },
		keywords: { type: DataTypes.ARRAY(DataTypes.STRING) },
		description: { type: DataTypes.STRING },

		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	},
	{
		sequelize,
		modelName: 'ArmorTemplate',
		tableName: 'ArmorTemplates',
	}
)

export default ArmorTemplate
