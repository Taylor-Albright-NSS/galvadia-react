import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

EnemyType.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING }, // Mudling, Goblin, Kobold, etc
		minLevel: { type: DataTypes.INTEGER },
		maxLevel: { type: DataTypes.INTEGER },
		baseHealth: { type: DataTypes.INTEGER },
		baseDamage: { type: DataTypes.INTEGER },
		baseExperience: { type: DataTypes.INTEGER },
		behavior: { type: DataTypes.STRING }, //
	},
	{
		sequelize,
		modelName: 'EnemyType',
	}
)
