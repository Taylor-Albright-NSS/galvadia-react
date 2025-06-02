import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export class Weapon extends Model {}

Weapon.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
		itemId: { type: DataTypes.INTEGER, allowNull: false, unique: true, references: { model: 'Items', key: 'id' } },
		templateId: { type: DataTypes.INTEGER },

		name: { type: DataTypes.STRING },
		damageTypes: { type: DataTypes.JSONB },
		minDamage: { type: DataTypes.INTEGER },
		maxDamage: { type: DataTypes.INTEGER },
		bonuses: { type: DataTypes.JSONB, defaultValue: {} },
		weight: { type: DataTypes.INTEGER },

		weaponSkill: { type: DataTypes.STRING },
		sellValue: { type: DataTypes.INTEGER },
		weaponSkill: { type: DataTypes.STRING },
		//If ownerType is player, location is among these: rightHand, leftHand, all other slots
		//If ownerType is anything but player, value is null
		location: { type: DataTypes.STRING },
		keywords: { type: DataTypes.ARRAY(DataTypes.STRING) },
		description: { type: DataTypes.TEXT },
	},
	{
		sequelize,
		modelName: 'Weapon',
		tableName: 'Weapons',
	}
)

export default Weapon
