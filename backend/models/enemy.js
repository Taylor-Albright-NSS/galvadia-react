import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.js' // Import the sequelize instance from your db.js

export class Enemy extends Model {}

Enemy.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		enemyTypeId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'EnemyTypes',
				key: 'id',
			},
		},
		area_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Area',
				key: 'id',
			},
		},

		name: { type: DataTypes.STRING },
		level: { type: DataTypes.INTEGER },
		health: { type: DataTypes.INTEGER },
		damage: { type: DataTypes.INTEGER },
		experience: { type: DataTypes.INTEGER },
		playerCombatIds: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
		loot: { type: DataTypes.ARRAY(DataTypes.JSONB) },

		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		modelName: 'Enemy',
		timestamps: true,
		// hooks: {
		// 	beforeSave() {
		// 		player.level = player.levelCalc
		// 	},
		// },
	}
)

export default Enemy
