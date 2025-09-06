// import { currentAreaItemsService } from '../controllerServices/areaActionServices.js'
import { createQuestItem } from '../controllerServices/itemServices.js'

export const handleItemAction = async (data, ws) => {
	const { ownerId, ownerType } = data
	if (data.action === 'spawnQuestItem') {
		await createQuestItem(ownerId, ownerType, 'Pair Of Glasses')
	}
}
