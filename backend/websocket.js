import express from 'express'
import http from 'http'
import { WebSocket, WebSocketServer } from 'ws'
import { players } from './controllers/playerController.js'
import { handlePlayerAction, handlePlayerModify } from './controllerHandlers/playerActionsHandler.js'
import { handleEnemyAction } from './controllerHandlers/enemyActionsHandler.js'
import { handlePlayerDataRetrieval } from './controllerHandlers/playerRetrieveDataHandler.js'
import { handleKeywordActions } from './controllerHandlers/keywordActionsHandler.js'
import { handleItemAction } from './controllerHandlers/itemActionsHandler.js'
import { handleAdminActions } from './controllerHandlers/adminActionsHandler.js'
import { handleQuestActions } from './controllerHandlers/questActionsHandler.js'
import { parse } from 'url'
import jwt from 'jsonwebtoken'
import Player from './models/player.js'
import { User } from './models/user.js'

export const app = express()
export const server = http.createServer(app)
export const wss = new WebSocketServer({ server })

export const connectedSockets = new Map()
export const connectedCharacters = new Map()

wss.on('connection', (ws, req) => {
	const { query } = parse(req.url, true)
	const token = query.token

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		if (!decoded) throw Error(`Failed to verify JWT. Decoded object is undefined`)
		const userId = decoded.id
		connectedSockets.set(userId, { ws, ...decoded })
		ws.id = userId
		console.log(`Player ${userId} connected`)
	} catch (err) {
		console.error(`Invalid token. Closing socket. Full error: ${err}`)
		ws.send(JSON.stringify({ error: 'Invalid token' }))
		ws.close()
		return
	}

	ws.on('message', async message => {
		console.log(ws.id, ' websocket id of user sending the message')
		let data
		try {
			data = JSON.parse(message)
		} catch (error) {
			return ws.send(JSON.stringify({ error: 'Failed to parse data' }))
		}
		if (data.type === 'admin') {
			handleAdminActions(data, ws)
		}
		if (data.type === 'join') {
			const [character, user] = await Promise.all([Player.findOne({ where: { id: data.playerId, userId: ws.id } }), User.findOne({ where: { id: ws.id } })])
			connectedCharacters.set(ws.id, { user, character })
			broadcast({ type: 'playerJoined', playerId: data.playerId })
		}
		if (data.type === 'quit') {
			console.log(`quit websocket endpoint hit`)
			console.log(ws.id, ' ws.id for quitting')
			if (connectedCharacters.has(ws.id)) {
				console.log(true, ` connected socket does have ${ws.id}`)
				connectedCharacters.delete(ws.id)
			}
			ws.close()
		}
		if (data.type === 'quest') {
			handleQuestActions(data, ws)
		}
		if (data.type === 'playerAction') {
			handlePlayerAction(data, ws, wss)
		}
		if (data.type === 'playerModify') {
			handlePlayerModify(data, ws, wss)
		}
		if (data.type === 'keyword') {
			handleKeywordActions(data, ws, wss)
		}
		if (data.type === 'enemyAction') {
			handleEnemyAction(data, ws, wss)
		}
		if (data.type === 'itemAction') {
			handleItemAction(data, ws, wss)
		}
		if (data.type === 'retrievePlayerData') {
			handlePlayerDataRetrieval(data, ws)
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
