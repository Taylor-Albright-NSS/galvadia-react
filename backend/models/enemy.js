import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js' // Import the sequelize instance from your db.js
import { playerGainsExperience } from '../controllers/playerController.js'

Enemy.init(
	{
		enemyTypeId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'EnemyTypes',
				key: 'id',
			},
		},
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
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
