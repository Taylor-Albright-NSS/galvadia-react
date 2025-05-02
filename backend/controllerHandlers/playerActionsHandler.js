import { playerRoomTransitionService } from '../controllerServices/playerActions.js'

//prettier-ignore
export const handlePlayerAction = (data, ws, wss) => {
	if (data.action === 'playerRoomTransition') {playerRoomTransitionService(data, ws, wss)}
}
