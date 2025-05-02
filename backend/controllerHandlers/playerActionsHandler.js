import { playerRoomTransitionService } from '../controllerServices/playerActions.js'
import { playerGainsExperienceService } from '../controllerServices/playerModify.js'

//prettier-ignore
export const handlePlayerAction = (data, ws, wss) => {
	if (data.action === 'playerRoomTransition') {playerRoomTransitionService(data, ws, wss)}
}

export const handlePlayerModify = (data, ws, wss) => {
	if (data.action === 'playerGainsExperience') {
		playerGainsExperienceService(data)
	}
}
