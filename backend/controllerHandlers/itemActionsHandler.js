// import { currentAreaItemsService } from '../controllerServices/areaActionServices.js'
import { createQuestItem } from '../controllerServices/itemServices.js'

export const handleItemAction = async (data, ws) => {
	try {
		console.log(data)
		// if (data.action === 'currentAreaItems') {
		// 	currentAreaItemsService(data, ws)
		// }
		if (data.action === 'spawnQuestItem') {
			await createQuestItem(data.ownerId, data.ownerType, 'Pair Of Glasses')
		}
	} catch (error) {
		console.error(`Error: `, error)
		ws.send(JSON.stringify({ type: error, message: error }))
	}
}
