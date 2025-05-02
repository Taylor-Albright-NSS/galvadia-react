import express from 'express'
import http from 'http'
import { WebSocket, WebSocketServer } from 'ws'
import { playerGainsExperience, playerRoomTransition } from './controllers/playerController.js'
import { players } from './controllers/playerController.js'
import { User } from './models/user.js'
import { getGameData } from './controllers/gameStateController.js'
import { handlePlayerAction } from './controllerHandlers/playerActionsHandler.js'

export const app = express()
export const server = http.createServer(app)
export const wss = new WebSocketServer({ server })

let playersWS = {}

wss.on('connection', ws => {
	ws.on('message', message => {
		let data
		try {
			data = JSON.parse(message)
		} catch (error) {
			return ws.send(JSON.stringify({ error: 'Failed to parse data' }))
		}
		let updatedPlayer
		if (data.type === 'playerAction') handlePlayerAction(data, ws, wss)

		// if (data.type === 'playerAction') {
		// 	async function response(data) {
		// 		try {
		// 			switch (data.action) {
		// 				case 'playerRoomTransition':
		// 					updatedPlayer = await playerRoomTransition(data, wss)
		// 					const gameData = { playerId: updatedPlayer.id, areaId: updatedPlayer.area_id }
		// 					const updatedGameData = await getGameData(gameData)
		// 					ws.send(JSON.stringify({ type: 'playerAction', action: 'playerRoomTransition', updatedPlayer, updatedGameData }))
		// 					break
		// 				case 'get':
		// 					const user = await User.findOne({ where: { id: 1 } })
		// 					ws.send(JSON.stringify({ type: 'user', user: user }))
		// 					break
		// 			}
		// 		} catch (error) {
		// 			ws.send(JSON.stringify({ testError: error }))
		// 		}
		// 	}
		// 	response(data)
		// }
		if (data.type === 'playerModify') {
			async function response(data) {
				switch (data.action) {
					case 'playerGainsExperience':
						updatedPlayer = await playerGainsExperience(data)
						ws.send(JSON.stringify({ type: 'playerModify', action: 'playerGainsExperience', updatedPlayer }))
						break
				}
			}
			response(data)
		}
		if (data.type === 'playerMoves') {
			console.log('PLAYER MOVES')
			//playerId and areaId of player who is moving
			const { playerId } = data
			const { areaId } = data
			let counter = 1
			//do something for each connected client
			wss.clients.forEach(client => {
				//if player's are in the same room as player leaving
				if (players?.[counter]?.areaId === areaId && ws != client) {
					console.log("Player's are in the same room")
					if (client.readyState === WebSocket.OPEN) {
						console.log('This client is not the player who moves')
						// client.send(JSON.stringify({type: "playerMoves", message: "LEAVES THE ROOM"}))
					}
				}
				counter++
			})
		}
		if (data.type === 'join') {
			console.log('data.type === join DATA')
			console.log('CLIENT HAS JOINED')
			playersWS[data.playerId] = ws
			players[data.playerId] = {}
			players[data.playerId].areaId = data.areaId
			players[data.playerId].id = data.playerId
			players[data.playerId].name = data.name
			console.log(players)
			broadcast({ type: 'playerJoined', playerId: data.playerId, player: playersWS })
		}
		if (data.type === 'playerDialogue') {
			const playerName = data.playerName
			const playerAreaId = data.areaId
			const playerDialogue = data.playerDialogue
			const dialogueToPlayer = `You say, "${playerDialogue}"`
			const dialogueToOthers = `${playerName} says, "${playerDialogue}"`

			let counter = 1
			wss.clients.forEach(client => {
				if (client.readyState === WebSocket.OPEN) {
					if (client === ws) {
						client.send(JSON.stringify({ type: 'playerDialogue', dialogue: dialogueToPlayer }))
					} else if (players?.[counter]?.areaId === playerAreaId) {
						client.send(JSON.stringify({ type: 'playerDialogue', dialogue: dialogueToOthers }))
					}
				}
				counter++
			})
			// broadcast({ type: "playerDialogue",  })
		}
		if (data.type === 'josh') {
			wss.clients.forEach(client => {
				if (client.readyState === WebSocket.OPEN) {
					let message
					if (client === ws) {
						message = `You are Josh.`
					} else {
						message = `Josh claims he is Josh`
					}
					client.send(
						JSON.stringify({
							type: 'joshCommand',
							id: 44,
							message: message,
							player: players,
						})
					)
				}
			})
		}
	})

	ws.on('close', () => {
		// Remove disconnected player
		Object.keys(players).forEach(playerId => {
			if (players[playerId] === ws) {
				delete players[playerId]
				broadcast({ type: 'playerLeft', playerId })
			}
		})
	})
})

function broadcast(message) {
	wss.clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(message))
		}
	})
}

const PORT = 3001
server.listen(PORT, () => {
	console.log(`WSS Server running on http://localhost:${PORT}`)
})

// console.log("WebSocket server running on ws://localhost:8080");
