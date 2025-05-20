import { Op } from 'sequelize'
import { broadcastToRoom } from '../broadcasts/broadcast.js'
import { getGameData } from '../controllers/gameStateController.js'
import { playerAdvancesEnemy, playerRegularAttack, playerRetreats, playerRoomTransition, players } from '../controllers/playerController.js'
import Area from '../models/area.js'
import Enemy from '../models/enemy.js'
import Item from '../models/item.js'
import { Keyword } from '../models/keyword.js'
import { Npc } from '../models/npc.js'
import Player from '../models/player.js'
import { PlayerNpc } from '../models/playerNpc.js'
import { PlayerArea } from '../models/playerArea.js'
import { applyPlayerArea } from '../utils/areaUtils.js'
import Weapon from '../models/weapon.js'
import { NpcDialogue } from '../models/npcDialogue.js'

export const playerRoomTransitionService = async (data, ws, wss) => {
	console.log('WEBSOCKET PLAYER ROOM TRANSITION')
	try {
		const { futureX, futureY, player } = data
		const newArea = await Area.findOne({ where: { x: futureX, y: futureY } })
		if (!newArea) {
			throw new Error(`Anticipated area not found`)
		}

		const newData = {
			playerId: player.id,
			areaId: newArea.id,
			previousAreaId: player.area_id,
			x: futureX,
			y: futureY,
		}
		console.log('Before playerRoomTransition')
		const updatedPlayer = await playerRoomTransition(newData, wss)
		const gameData = { playerId: updatedPlayer.id, areaId: updatedPlayer.area_id }
		console.log('Before updatedGameData')
		const updatedGameData = await getGameData(gameData)
		ws.send(JSON.stringify({ type: 'playerAction', action: 'playerRoomTransition', updatedPlayer, updatedGameData }))
		broadcastToRoom(wss, updatedPlayer, newData.areaId)
	} catch (error) {
		ws.send(JSON.stringify({ type: 'error', message: error.message }))
	}
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

export const playerSpeaksToNpcService = async (data, ws) => {
	const { playerId, npcId } = data
	console.log(playerId, npcId, ' playerId --- npcId')
	let playerNpc = await PlayerNpc.findOne({ where: { playerId, npcId } })

	if (!playerNpc && playerId > 0) {
		playerNpc = await PlayerNpc.create({ playerId, npcId })
	}

	if (!playerNpc && (isNaN(playerId) || isNaN(npcId))) {
		return ws.send(JSON.stringify({ type: 'error', message: 'Invalid playerNpc' }))
	}

	const npcDialogue = await NpcDialogue.findOne({
		where: {
			npcId,
			dialogueStage: playerNpc.dialogueStage,
		},
	})

	if (!npcDialogue) {
		return ws.send(JSON.stringify({ type: 'error', message: 'Dialogue not found' }))
	}

	const npc = await Npc.findByPk(npcId)

	if (!npc) {
		return ws.send(JSON.stringify({ type: 'error', message: 'Npc not found' }))
	}

	const dialogueArray = npcDialogue.dialogue
	const dialogueIndex = playerNpc.dialogueIndex % dialogueArray.length
	const dialogue = dialogueArray[dialogueIndex]
	playerNpc.dialogueIndex = (dialogueIndex + 1) % dialogueArray.length
	await playerNpc.save()
	ws.send(JSON.stringify({ type: 'playerAction', action: 'playerSpeaksToNpc', dialogue, npc }))
}

export const playerLooksService = async (data, ws) => {
	try {
		const { playerId, areaId } = data

		const area = await Area.findOne({ where: { id: areaId }, include: { model: Keyword } })
		const playerArea = await PlayerArea.findOne({ where: { playerId, area_id: areaId } })
		let modifiedArea
		if (playerArea) {
			modifiedArea = applyPlayerArea(playerArea, area)
		} else {
			modifiedArea = area
		}

		const [enemies, baseNpcs, items, players, playerNpcs] = await Promise.all([
			// Area.findOne({ where: { id: areaId }, include: { model: Keyword } }),
			Enemy.findAll({ where: { area_id: areaId } }),
			Npc.findAll({ where: { area_id: areaId } }),
			Item.findAll({ where: { ownerId: areaId, ownerType: 'area' }, include: [{ model: Weapon }] }),
			Player.findAll({ where: { area_id: areaId, id: { [Op.ne]: playerId } } }),
			PlayerNpc.findAll({ where: { area_id: areaId, playerId } }),
		])
		const missingNpcs = baseNpcs.filter(npc => !playerNpcs.some(playerNpc => playerNpc.npcId === npc.id))
		await Promise.all(
			missingNpcs.map(npc => {
				PlayerNpc.create({
					playerId: playerId,
					npcId: npc.id,
					area_id: areaId,
					// dialogueStage: npc.dialogueStage,
					// dialogueIndex: npc.dialogueIndex,
					// questStage: npc.questStage,
				})
			})
		)

		const npcs = await PlayerNpc.findAll({
			where: { area_id: areaId, playerId },
			include: [{ model: Npc }], // Include master NPC reference for name, etc.
		})

		const gameData = { currentArea: modifiedArea, enemies, npcs, items, players }
		ws.send(JSON.stringify({ type: 'playerAction', action: 'playerLooks', gameData }))
	} catch (error) {
		ws.send(JSON.stringify({ type: 'error', message: error.message }))
	}
}
