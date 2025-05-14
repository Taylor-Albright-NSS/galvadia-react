import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Weapon = sequelize.define(
	'Weapon',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
		templateId: { type: DataTypes.INTEGER },

		name: { type: DataTypes.STRING },
		ownerId: { type: DataTypes.INTEGER },
		ownerType: { type: DataTypes.STRING },
		keywords: { type: DataTypes.ARRAY(DataTypes.STRING) },
		description: { type: DataTypes.TEXT },
		damageType: { type: DataTypes.ARRAY(DataTypes.STRING) },
		minDamage: { type: DataTypes.INTEGER },
		maxDamage: { type: DataTypes.INTEGER },
		weight: { type: DataTypes.INTEGER },
		sellValue: { type: DataTypes.INTEGER },
		isTwoHanded: { type: DataTypes.BOOLEAN, defaultValue: false },
		//If ownerType is player, location is among these: right_hand, left_hand, all other slots
		//If ownerType is anything but player, value is null
		location: { type: DataTypes.STRING },
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	},
	{
		timestamps: true,
	}
)
