import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../config/db.js' // Import the sequelize instance from your db.js

export const Keyword = sequelize.define(
	'Keyword',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		area_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Area', key: 'id' } },
		actionAreaId: { type: DataTypes.INTEGER },
		npcId: { type: DataTypes.INTEGER },
		special: { type: DataTypes.JSON },
		actionVerb: { type: DataTypes.STRING },
		name: { type: DataTypes.STRING },
		refName: { type: DataTypes.STRING },
		color: { type: DataTypes.STRING },
		description: { type: DataTypes.ARRAY(DataTypes.STRING) },
		activateDescription: { type: DataTypes.ARRAY(DataTypes.STRING) },
		alreadyActivatedDescription: { type: DataTypes.ARRAY(DataTypes.STRING) },
		methodCode: { type: DataTypes.STRING },
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	},
	{
		timestamps: true,
	}
)
