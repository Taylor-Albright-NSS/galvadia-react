export const playerRoomTransitionSend = async (ws, inputDirection) => {
	ws.send(JSON.stringify({ type: 'playerAction', action: 'playerRoomTransition', inputDirection }))
}

export const areaGetByCoordinates = (ws, coords) => {
	ws.send(JSON.stringify({ type: 'areaAction', action: 'anticipatedArea', coords }))
}
