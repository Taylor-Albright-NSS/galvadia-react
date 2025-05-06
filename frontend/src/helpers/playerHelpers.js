export const isDoorLockedPlayerMoves = (currentArea, inputDirection, addLog) => {
	if (currentArea.exitsBool[inputDirection] == 'locked') {
		addLog('You cannot move in this direction. The door is locked.')
		return true
	}
	return false
}
export const isDoorBlockedPlayerMoves = (currentArea, inputDirection, addLog) => {
	if (currentArea.exitsBool[inputDirection] == 'blocked') {
		addLog('The way forward is blocked.')
		return true
	}
	return false
}

export const isPlayerInCombat = (playerStatus, addLog) => {
	console.log(playerStatus.isInCombat())
	if (playerStatus.isInCombat()) {
		addLog(`You cannot move while in combat.`)
		return true
	}
	return false
}

