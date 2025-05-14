import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.js'

export class WeaponTemplate extends Model {}

WeaponTemplate.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		templateType: { type: DataTypes.STRING },
		name: { type: DataTypes.STRING }, // Dagger, Training Onehanded Sword, etc
		damageType: { type: DataTypes.ARRAY(DataTypes.STRING) },
		minDamageMin: { type: DataTypes.INTEGER },
		minDamageMax: { type: DataTypes.INTEGER },
		maxDamageMin: { type: DataTypes.INTEGER },
		maxDamageMax: { type: DataTypes.INTEGER },
		weight: { type: DataTypes.INTEGER },
		sellValue: { type: DataTypes.INTEGER },
		isTwoHanded: { type: DataTypes.BOOLEAN },
		keywords: { type: DataTypes.ARRAY(DataTypes.STRING) },
		description: { type: DataTypes.STRING },

		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	},
	{
		sequelize,
		modelName: 'WeaponTemplate',
	}
)

export default WeaponTemplate
