import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.js'

export class Item extends Model {}

Item.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
		name: { type: DataTypes.STRING },
		ownerId: { type: DataTypes.INTEGER },
		ownerType: { type: DataTypes.STRING },
		templateId: { type: DataTypes.INTEGER },
		templateType: { type: DataTypes.STRING },
		keywords: { type: DataTypes.ARRAY(DataTypes.STRING) },
		location: { type: DataTypes.STRING },
	},
	{
		sequelize,
		modelName: 'Item',
		tableName: 'Items',
		timestamps: true,
	}
)
export default Item

//OLD WAY. REVERT IF NEEDED

// import { DataTypes, Model } from 'sequelize'
// import { sequelize } from '../config/db.js'

// export class Item extends Model {}

// Item.init(
// 	{
// 		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
// 		name: { type: DataTypes.STRING },
// 		ownerId: { type: DataTypes.INTEGER },
// 		ownerType: { type: DataTypes.STRING },
// 		templateId: { type: DataTypes.INTEGER },
// 		templateType: { type: DataTypes.STRING },
// 		location: { type: DataTypes.STRING },
// 		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
// 		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
// 	},
// 	{
// 		sequelize,
// 		modelName: 'Item',
// 		timestamps: true,
// 	}
// )

// export default Item
