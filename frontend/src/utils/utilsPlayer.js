export const toggleStatusTrue = (playerStatus, statusType) => !playerStatus[statusType] && (playerStatus[statusType] = true)
export const toggleStatusFalse = (playerStatus, statusType) => playerStatus[statusType] && (playerStatus[statusType] = false)

export const playerIsInCombatCheck = (playerId, enemies) => {
    const isInCombat = enemies.some(enemy => enemy.playerCombatIds.includes(playerId))
    return isInCombat
}

export const isDoorLockedPlayerMoves = (currentArea, inputDirection, addLog) => {
	if (currentArea.exitsBool[inputDirection] === 'locked') {
		return true
	}
	return false
}
export const isDoorBlockedPlayerMoves = (currentArea, inputDirection) => {
	if (currentArea.exitsBool[inputDirection] === 'blocked') {
		return true
	}
	return false
}