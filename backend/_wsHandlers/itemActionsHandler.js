// import { currentAreaItemsService } from '../controllerServices/areaActionServices.js'

import { serviceCreateQuestItem } from '../_xservices/servicesItem.js'

export const handleItemAction = async (data, ws) => {
	const { ownerId, ownerType } = data
	if (data.action === 'spawnQuestItem') {
		await serviceCreateQuestItem(ownerId, ownerType, 'Pair Of Glasses')
	}
}
