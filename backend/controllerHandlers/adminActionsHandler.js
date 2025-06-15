import { adminPlayerAreaToggle, adminRevertAllPlayerRelationships } from '../utils/adminUtils/adminPlayerAreaUtils.js'
import { adminKeywordToggle } from '../utils/adminUtils/adminPlayerKeywordUtils.js'

export const handleAdminActions = (data, ws, wss) => {
	if (data.action === 'PlayerKeywordActivation') adminKeywordToggle(data, ws, wss)
	if (data.action === 'PlayerArea') adminPlayerAreaToggle(data, ws, wss)
	if (data.action === 'resetPlayer') adminRevertAllPlayerRelationships(data, ws, wss)
}
