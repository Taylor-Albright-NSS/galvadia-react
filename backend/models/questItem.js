import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.js'

export class QuestItem extends Model {}

QuestItem.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING }, //Pair Of Glasses
		itemId: { type: DataTypes.INTEGER },
		templateId: { type: DataTypes.INTEGER },
		questId: { type: DataTypes.INTEGER },
		ownerId: { type: DataTypes.INTEGER },
		ownerType: { type: DataTypes.STRING },
		location: { type: DataTypes.STRING },
		keywords: { type: DataTypes.ARRAY(DataTypes.STRING) },
		description: { type: DataTypes.STRING },

		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	},
	{
		sequelize,
		modelName: 'QuestItem',
		tableName: 'QuestItems',
	}
)

export default QuestItem
