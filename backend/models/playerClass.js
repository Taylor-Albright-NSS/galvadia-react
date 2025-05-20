import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.js'

export class PlayerClass extends Model {}

PlayerClass.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING },
		strength: { type: DataTypes.INTEGER },
		dexterity: { type: DataTypes.INTEGER },
		agility: { type: DataTypes.INTEGER },
		constitution: { type: DataTypes.INTEGER },
		intelligence: { type: DataTypes.INTEGER },
		wisdom: { type: DataTypes.INTEGER },
		mysticism: { type: DataTypes.INTEGER },
	},
	{
		sequelize,
		modelName: 'PlayerClass',
		timestamps: true,
		tableName: 'PlayerClasses',
	}
)
