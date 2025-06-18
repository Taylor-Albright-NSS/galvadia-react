import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.js'

export class QuestItemTemplate extends Model {}

QuestItemTemplate.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING }, //Pair Of Glasses
		questId: { type: DataTypes.INTEGER },
		ownerId: { type: DataTypes.INTEGER },
		templateType: { type: DataTypes.STRING },
		ownerType: { type: DataTypes.STRING },
		location: { type: DataTypes.STRING },
		keywords: { type: DataTypes.ARRAY(DataTypes.STRING) },
		description: { type: DataTypes.STRING },

		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	},
	{
		sequelize,
		modelName: 'QuestItemTemplate',
		tableName: 'QuestItemTemplates',
	}
)

export default QuestItemTemplate
