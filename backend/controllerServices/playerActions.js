import { broadcastToRoom } from '../broadcasts/broadcast.js'
import { getGameData } from '../controllers/gameStateController.js'
import { playerRoomTransition, players } from '../controllers/playerController.js'

export const playerRoomTransitionService = async (data, ws, wss) => {
	const updatedPlayer = await playerRoomTransition(data, wss)
	const gameData = { playerId: updatedPlayer.id, areaId: updatedPlayer.area_id }
	const updatedGameData = await getGameData(gameData)
	ws.send(JSON.stringify({ type: 'playerAction', action: 'playerRoomTransition', updatedPlayer, updatedGameData }))
	broadcastToRoom(wss, updatedPlayer, data.combinedCoords.area_id)
}
