import { getAreaByCoords } from '../fetches/areas/areas'
import { isDoorBlockedPlayerMoves, isDoorLockedPlayerMoves, isPlayerInCombat } from '../helpers/playerHelpers'
import { playerRoomTransitionSend } from '../senders/sendersMovement'
import { toggleStatusFalse } from '../utils/utilsPlayer'

export const moveDirection = async (gameData, setGameData, inputDirection, addLog, socket, playerStatus) => {
	const { currentArea, player } = gameData
	toggleStatusFalse(playerStatus, 'isTalking')
	//can player move checks
	if (isDoorLockedPlayerMoves(currentArea, inputDirection, addLog)) return
	if (isDoorBlockedPlayerMoves(currentArea, inputDirection, addLog)) return
	if (isPlayerInCombat(playerStatus, addLog)) return
	
	const directionCoordsList = {
		north: { x: 0, y: 1 },
		east: { x: 1, y: 0 },
		south: { x: 0, y: -1 },
		west: { x: -1, y: 0 },
	}
	const directionCoords = directionCoordsList[inputDirection]
	const combinedCoords = {
		x: player.x + directionCoords.x,
		y: player.y + directionCoords.y,
	}
	
    const newAreaIfExists = await getAreaByCoords(combinedCoords)
	if (newAreaIfExists && !currentArea?.exitsBool?.[inputDirection]) {
		addLog(`(This should not happen. Room exists, but direction is not part of exits bool)`)
		return
	}
	if (!newAreaIfExists) {
		addLog('Cannot move in that direction (AREA DOES NOT EXIST)')
		return
	}
	combinedCoords.area_id = newAreaIfExists.id
	combinedCoords.oldAreaId = player.area_id
    playerRoomTransitionSend(socket, player, combinedCoords)
}
