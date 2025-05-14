import { players } from '../controllers/playerController.js'

function broadcast(message) {
	//change to broadcastToWorld
	wss.clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(message))
		}
	})
}

export const broadcastToRoom = (wss, updatedPlayer, area_id) => {
	// let counter = 1
	const { id } = updatedPlayer
	;[...wss.clients].forEach((client, index) => {
		console.log(`Client #:`, index)
		let counter = index + 1
		if (!players?.[counter]?.name) return
		let player = players[counter]
		if (player.id != parseInt(id)) {
			if (player.areaId === area_id) {
				console.log('BROADCAST TO ROOM SUCCESS')
				client.send(JSON.stringify({ type: 'playerMoves', message: 'Player enters the room' }))
			}
		}
	})
}
