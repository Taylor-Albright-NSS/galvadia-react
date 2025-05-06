import { broadcastToRoom } from '../broadcasts/broadcast.js'
import { getGameData } from '../controllers/gameStateController.js'
import { playerAdvancesEnemy, playerRegularAttack, playerRetreats, playerRoomTransition } from '../controllers/playerController.js'

export const playerRoomTransitionService = async (data, ws, wss) => {
	const updatedPlayer = await playerRoomTransition(data, wss)
	const gameData = { playerId: updatedPlayer.id, areaId: updatedPlayer.area_id }
	const updatedGameData = await getGameData(gameData)
	ws.send(JSON.stringify({ type: 'playerAction', action: 'playerRoomTransition', updatedPlayer, updatedGameData }))
	broadcastToRoom(wss, updatedPlayer, data.combinedCoords.area_id)
}

export const playerRegularAttackService = async (data, ws, wss) => {
	console.log(data, ' DATA')
	await playerRegularAttack(data, ws, wss)
}

export const playerAdvancesEnemyService = async (data, ws, wss) => {
	console.log(data, ' DATA')
	await playerAdvancesEnemy(data, ws, wss)
}

export const playerRetreatsService = async (data, ws, wss) => {
	console.log(data, ' DATA')
	await playerRetreats(data, ws, wss)
}
