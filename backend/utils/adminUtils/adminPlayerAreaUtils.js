import Player from '../../models/player.js'
import { PlayerArea } from '../../models/playerArea.js'
import { PlayerKeywordActivation } from '../../models/playerKeywordActivation.js'
import { PlayerNpc } from '../../models/playerNpc.js'

export const adminPlayerAreaToggle = async (data, ws) => {
	try {
		const { playerId, areaId, unlockedDirections, unblockedDirections } = data
		const playerArea = await PlayerArea.findOne({ where: { playerId, area_id: areaId } })
		await playerArea.update({
			unlockedDirections,
			unblockedDirections,
		})
		await playerArea.save()
		console.log(playerArea, ' Updated PlayerArea')
		ws.send(JSON.stringify({ type: 'admin', action: 'PlayerArea', message: `Directions successfully changed` }))
	} catch (error) {
		console.error(error)
		ws.send(JSON.stringify({ type: 'error', message: 'Error updating directions' }))
	}
}

export const adminRevertAllPlayerRelationships = async (data, ws) => {
	//This resets all player relationships and teleports the player back to the starting room
	const { playerId } = data
	console.log('admin revert all player relationships hit')
	const [player, playerArea, playerNpc, playerKeywordActivation] = await Promise.all([Player.findOne({ where: { id: playerId } }), PlayerArea.findAll({ where: { playerId } }), PlayerNpc.findAll({ where: { playerId } }), PlayerKeywordActivation.findAll({ where: { playerId } })])
	console.log(player, ' reverted player')
	console.log(playerArea, ' reverted playerArea')
	console.log(playerNpc, ' reverted playerNpc')
	await Promise.all([...playerArea.map(area => area.destroy()), ...playerNpc.map(npc => npc.destroy()), ...playerKeywordActivation.map(pka => pka.destroy())])
	const updatedPlayer = await player.update({
		area_id: 1,
		x: 0,
		y: 0,
		z: 0,
	})
	const payload = {
		updatedPlayer,
	}

	ws.send(JSON.stringify({ type: 'admin', action: 'resetPlayer', payload }))
}
