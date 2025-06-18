import { questCompleteService } from '../controllerServices/questServices.js'

export const handleQuestActions = (data, ws, wss) => {
	console.log('handleQuestActions hit')
	if (data.action === 'complete') questCompleteService(data, ws, wss)
}
