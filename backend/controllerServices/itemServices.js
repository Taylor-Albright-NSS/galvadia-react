import { sequelize } from '../config/db.js'
import Item from '../models/item.js'
import QuestItem from '../models/questItem.js'
import QuestItemTemplate from '../models/questItemTemplate.js'

export const createQuestItem = async (ownerId, ownerType, name) => {
	const transaction = await sequelize.transaction()
	try {
		const template = await QuestItemTemplate.findOne({ where: { name } })
		const item = await Item.create(
			{
				name: template.name,
				ownerId,
				ownerType,
				templateId: template.id,
				templateType: template.templateType,
				location: ownerType === 'player' ? 'inventory' : 'area',
				description: template.description,
				keywords: template.keywords,
			},
			{ transaction }
		)

		const questItem = await QuestItem.create(
			{
				itemId: item.id,
				templateId: template.id,
				questId: template.questId,
				name: template.name,
				ownerId,
				ownerType,
				location: ownerType === 'player' ? 'inventory' : 'area',
				keywords: template.keywords,
			},
			{ transaction }
		)
		item.dataValues.quest = questItem
		item.setDataValue('quest', questItem)

		await transaction.commit()
		return item
	} catch (error) {
		await transaction.rollback()
		throw error
	}
}
