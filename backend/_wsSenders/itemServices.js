import { sequelize } from '../config/db.js'
import Item from '../models/item.js'
import QuestItem from '../models/questItem.js'
import QuestItemTemplate from '../models/questItemTemplate.js'

//Not sure if this function is even useful. Was a test function at some point I think?
export const senderSpawnItemToPlayer = async (playerId, name, keywords, ws) => {
	try {
		const item = await Item.create({ name, ownerId: playerId, ownerType: 'player', keywords, location: 'inventory' })
		console.log(item, ' item')
		if (!item) {
			throw new Error(`Item failed to be created`)
		}
		return ws.send(JSON.stringify({ type: 'itemAction', action: 'itemToPlayer', item }))
	} catch (error) {
		console.error(`Error: `, error)
		return ws.send(JSON.stringify({ type: 'error', message: "Internal server error. I think it's because of the unique ID contraint" }))
	}
}
