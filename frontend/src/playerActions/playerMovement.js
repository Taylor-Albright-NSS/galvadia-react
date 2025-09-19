import { getAreaByCoords } from '../fetches/areas/areas'
import { playerRoomTransitionSend } from '../senders/sendersMovement'
import { isDoorBlockedPlayerMoves, isDoorLockedPlayerMoves, playerIsInCombatCheck, toggleStatusFalse } from '../utils/utilsPlayer'

export const moveDirection = async (gameData, setGameData, inputDirection, addLog, ws, playerStatus) => {
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
		north: { x: 0, y: 1, z: 0 },
		east: { x: 1, y: 0, z: 0 },
		south: { x: 0, y: -1, z: 0 },
		west: { x: -1, y: 0, z: 0 },
		up: { x: 0, y: 0, z: 1 },
		down: { x: 0, y: 0, z: -1 },
	}
	const directionCoords = directionCoordsList[inputDirection]
	const futureX = player.x + directionCoords.x
	const futureY = player.y + directionCoords.y
	const futureZ = player.z + directionCoords.z

	playerRoomTransitionSend(ws, inputDirection)
}
