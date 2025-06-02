import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export class Armor extends Model {}

Armor.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
		itemId: { type: DataTypes.INTEGER, allowNull: false, unique: true, references: { model: 'Items', key: 'id' } },
		templateId: { type: DataTypes.INTEGER },

		name: { type: DataTypes.STRING },
		armorValues: { type: DataTypes.JSONB },
		slot: { type: DataTypes.STRING },
		material: { type: DataTypes.STRING },
		bonuses: { type: DataTypes.JSONB, defaultValue: {} },
		weight: { type: DataTypes.INTEGER },
		sellValue: { type: DataTypes.INTEGER },
		//If ownerType is player, location is among these: rightHand, leftHand, inventory, {slotName}
		location: { type: DataTypes.STRING },
		keywords: { type: DataTypes.ARRAY(DataTypes.STRING) },
		description: { type: DataTypes.TEXT },
	},
	{
		sequelize,
		modelName: 'Armor',
		tableName: 'Armors',
	}
)

export default Armor
