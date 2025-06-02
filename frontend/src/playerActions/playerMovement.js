import { getAreaByCoords } from '../fetches/areas/areas'
import { playerRoomTransitionSend } from '../senders/sendersMovement'
import { isDoorBlockedPlayerMoves, isDoorLockedPlayerMoves, playerIsInCombatCheck, toggleStatusFalse } from '../utils/utilsPlayer'

export const moveDirection = async (gameData, setGameData, inputDirection, addLog, socket, playerStatus) => {
	const { currentArea, player, enemies } = gameData
	toggleStatusFalse(playerStatus, 'isTalking')
	//can player move checks
	if (isDoorLockedPlayerMoves(currentArea, inputDirection)) {
		addLog('You cannot move in this direction. The door is locked')
		return
	}
	if (isDoorBlockedPlayerMoves(currentArea, inputDirection)) {
		addLog('The way forward is blocked')
		return
	}
	if (playerIsInCombatCheck(player.id, enemies)) {
		addLog(`You cannot move while in combat`)
		return
	}
	
	const directionCoordsList = {
		north: { x: 0, y: 1 },
		east: { x: 1, y: 0 },
		south: { x: 0, y: -1 },
		west: { x: -1, y: 0 },
	}
	const directionCoords = directionCoordsList[inputDirection]
	const futureX = player.x + directionCoords.x
	const futureY = player.y + directionCoords.y
	const combinedCoords = {
		x: futureX,
		y: futureY
	}
	
	//old REST API
    // const newAreaIfExists = await getAreaByCoords(combinedCoords)
	// if (!newAreaIfExists) {
	// 	addLog(`Area does not exist`)
	// }
	
	// if (newAreaIfExists && !currentArea?.exitsBool?.[inputDirection]) {
	// 	addLog(`(This should not happen. Room exists, but direction is not part of exits bool)`)
	// 	return
	// }
	// if (!newAreaIfExists) {
	// 	addLog('Cannot move in that direction (AREA DOES NOT EXIST)')
	// 	return
	// }
	// newAreaData.area_id = newAreaIfExists.id
	// newAreaData.oldAreaId = player.area_id

    playerRoomTransitionSend(socket, player, futureX, futureY)
}
