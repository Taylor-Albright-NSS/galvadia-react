export const userQuits = commandObject => {
	let { ws } = commandObject
	const { player } = commandObject.gameData
	console.log(player, ' THIS IS THE PLAYER WHO IS DISCONNECTING')
	ws.send(JSON.stringify({ type: 'quit', playerId: player.id }))
	ws.close()
	ws = null
	window.location.href = '/character-select'
}
