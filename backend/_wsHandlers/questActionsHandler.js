import { questCompleteService } from '../controllerServices/questServices.js'

export const handleQuestActions = (data, ws, wss) => {
	if (data.action === 'complete') questCompleteService(data, ws, wss)
}
