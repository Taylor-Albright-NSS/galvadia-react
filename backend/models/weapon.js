import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export class Weapon extends Model {}

Weapon.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
		itemId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
			references: {
				model: 'Items',
				key: 'id',
			},
		},
		templateId: { type: DataTypes.INTEGER },
		ownerId: { type: DataTypes.INTEGER },
		ownerType: { type: DataTypes.STRING },

		name: { type: DataTypes.STRING },
		damageType: { type: DataTypes.ARRAY(DataTypes.STRING) },
		minDamage: { type: DataTypes.INTEGER },
		maxDamage: { type: DataTypes.INTEGER },
		bonuses: { type: DataTypes.JSONB, defaultValue: {} },
		weight: { type: DataTypes.INTEGER },
		sellValue: { type: DataTypes.INTEGER },
		isTwoHanded: { type: DataTypes.BOOLEAN, defaultValue: false },
		//If ownerType is player, location is among these: right_hand, left_hand, all other slots
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

// import { DataTypes } from 'sequelize'
// import { sequelize } from '../config/db.js'

// export const Weapon = sequelize.define(
// 	'Weapon',
// 	{
// 		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
// 		templateId: { type: DataTypes.INTEGER },

// 		name: { type: DataTypes.STRING },
// 		ownerId: { type: DataTypes.INTEGER },
// 		ownerType: { type: DataTypes.STRING },
// 		keywords: { type: DataTypes.ARRAY(DataTypes.STRING) },
// 		description: { type: DataTypes.TEXT },
// 		damageType: { type: DataTypes.ARRAY(DataTypes.STRING) },
// 		minDamage: { type: DataTypes.INTEGER },
// 		maxDamage: { type: DataTypes.INTEGER },
// 		weight: { type: DataTypes.INTEGER },
// 		sellValue: { type: DataTypes.INTEGER },
// 		isTwoHanded: { type: DataTypes.BOOLEAN, defaultValue: false },
// 		//If ownerType is player, location is among these: right_hand, left_hand, all other slots
// 		//If ownerType is anything but player, value is null
// 		location: { type: DataTypes.STRING },
// 		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
// 		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
// 	},
// 	{
// 		timestamps: true,
// 	}
// )
