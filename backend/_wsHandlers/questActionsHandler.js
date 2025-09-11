import { questCompleteService } from '../_wsSenders/questServices.js'

export const handleQuestActions = (data, ws, wss) => {
	if (data.action === 'complete') questCompleteService(data, ws, wss)
}
