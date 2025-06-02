import { Op } from 'sequelize'
import { broadcastToRoom } from '../broadcasts/broadcast.js'
import { getGameData } from '../controllers/gameStateController.js'
import { playerAdvancesEnemy, playerItemInHandsCheck, playerRegularAttack, playerRetreats, playerRoomTransition } from '../controllers/playerController.js'
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
import Armor from '../models/armor.js'
import { playerUpdateAllAttributes } from '../utils/calculations/calculationsPlayer.js'

export const playerRoomTransitionService = async (data, ws, wss) => {
	console.log('WEBSOCKET PLAYER ROOM TRANSITION')
	try {
		const { futureX, futureY, player } = data
		const newArea = await Area.findOne({ where: { x: futureX, y: futureY } })
		if (!newArea) {
			ws.send(JSON.stringify({ type: 'playerAction', action: 'playerRoomTransition', updatedGameData: null }))
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
		console.log(updatedGameData, 'updated game data')
		ws.send(JSON.stringify({ type: 'playerAction', action: 'playerRoomTransition', updatedPlayer, updatedGameData }))
		broadcastToRoom(wss, updatedPlayer, newData.areaId)
	} catch (error) {
		console.error(error)
		ws.send(JSON.stringify({ type: 'error', message: error }))
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

export const playerEquipsArmorService = async (data, ws) => {
	const { playerId, itemId } = data
	const item = await Item.findByPk(itemId, {
		include: [{ model: Armor }],
	})
	console.log(item, ' item')
	if (!item) {
		console.log("item doesn't exist")
		return ws.send(JSON.stringify({ type: 'error', message: 'Item does not exist' }))
	}
	if (!item.hasOwnProperty('Armor')) {
		console.log('item is unequippable')
		return ws.send(JSON.stringify({ type: 'error', message: 'Item is not equippable' }))
	}
	item.update({
		location: item.Armor.slot,
	})
	console.log(item.Armor.slot, ' item.Armor.slot')
	console.log(item.location, ' item.location')
	await playerUpdateAllAttributes(playerId, ws)
	ws.send(JSON.stringify({ type: 'playerAction', action: 'playerEquipsArmor', item }))
}

export const playerRemovesArmorService = async (data, ws) => {
	try {
		const { playerId, itemId } = data

		const item = await Item.findByPk(itemId, { include: [{ model: Armor }] })
		if (!item) throw new Error(`Item not found`)

		const playerHeldItems = await Item.findAll({
			where: {
				ownerId: playerId,
				ownerType: 'player',
				location: 'rightHand' || 'leftHand',
			},
		})

		if (playerHeldItems.length === 0) {
			item.update({
				location: 'rightHand',
			})
		}
		if (playerHeldItems[0] && playerHeldItems[0].location === 'leftHand') {
			item.update({
				location: 'rightHand',
			})
		}
		if (playerHeldItems[0] && playerHeldItems[0].location === 'rightHand') {
			item.update({
				location: 'leftHand',
			})
		}

		if (!item.hasOwnProperty('Armor')) throw new Error('Item is not a type that can be equipped')

		await playerUpdateAllAttributes(playerId, ws)
		ws.send(JSON.stringify({ type: 'playerAction', action: 'playerRemovesArmor', item }))
	} catch (error) {
		console.error(error)
		ws.send(JSON.stringify({ type: 'error', error }))
	}
}

export const playerSpeaksToNpcService = async (data, ws) => {
	const { playerId, npcId, areaId } = data
	console.log(playerId, npcId, ' playerId --- npcId')
	let playerNpc = await PlayerNpc.findOne({ where: { playerId, npcId } })

	if (!playerNpc && playerId > 0) {
		playerNpc = await PlayerNpc.create({ playerId, npcId, area_id: areaId })
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

export const playerSpeaksNpcUnlocksDirection = async (req, res) => {
	try {
		const { playerId, npcId, areaId } = req.body
		console.log(playerId, npcId, areaId, ' playerId, npcId, areaId')
		const playerNpc = await PlayerNpc.findOne({ where: { playerId, npcId } })
		if (!playerNpc) {
			throw new Error(`PlayerNpc could not be found`)
		}
		playerNpc.dialogueStage++
		await playerNpc.save()
		const newPlayerArea = await PlayerArea.create({
			playerId,
			area_id: areaId,
			unblockedDirections: {
				west: true,
			},
		})
		await newPlayerArea.save()
	} catch (error) {
		console.error(`Error: `, error)
		ws.send(JSON.stringify({ type: 'error', error }))
	}
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

export const playerPacksItemService = async (data, ws) => {
	console.log(data, ' raw data')
	try {
		const { playerId, itemId, itemLocation } = data
		const itemToPack = await Item.findOne({
			where: {
				id: itemId,
				ownerId: playerId,
				ownerType: 'player',
				location: itemLocation,
			},
			include: [Weapon, Armor],
		})
		console.log(itemToPack, ' item to pack')
		if (!itemToPack) throw new Error(`Item not found`)
		if (itemToPack.location !== 'rightHand' && itemToPack.location !== 'leftHand') throw new Error(`Item must be in hand to pack`)

		await itemToPack.update({ location: 'inventory' })
		if (itemToPack.templateType === 'weapon') await playerUpdateAllAttributes(playerId, ws)
		ws.send(JSON.stringify({ type: 'playerAction', action: 'playerPacksItem', item: itemToPack }))
	} catch (error) {
		console.error(error)
		ws.send(JSON.stringify({ type: 'error', message: error }))
	}
}

export const playerUnpacksItemService = async (data, ws) => {
	try {
		const { playerId, itemId, itemLocation } = data
		const availableHands = await playerItemInHandsCheck(playerId)
		const { leftHandOpen, rightHandOpen } = availableHands
		if (!leftHandOpen && !rightHandOpen) throw new Error(`Player's hands are full`)

		const itemToUnpack = await Item.findOne({
			where: {
				id: itemId,
				ownerId: playerId,
				ownerType: 'player',
				location: itemLocation,
			},
			include: [{ model: Weapon }, { model: Armor }],
		})

		if ((!leftHandOpen || !rightHandOpen) && itemToUnpack.weaponSkill === 'twohanded') throw new Error('Both hands must be free in order to unpack a twohanded item')
		if (itemToUnpack.location !== 'inventory') throw new Error(`Item must be in inventory to unpack`)
		if (!itemToUnpack) throw new Error(`Item not found`)

		if (rightHandOpen && leftHandOpen && itemToUnpack.weaponSkill === 'twohanded') await itemToUnpack.update({ location: 'bothHands' })
		if (rightHandOpen) await itemToUnpack.update({ location: 'rightHand' })
		else if (leftHandOpen) await itemToUnpack.update({ location: 'leftHand' })
		if (itemToUnpack.templateType === 'weapon') await playerUpdateAllAttributes(playerId, ws)
		ws.send(JSON.stringify({ type: 'playerAction', action: 'playerUnpacksItem', item: itemToUnpack }))
	} catch (error) {
		console.error(error)
		ws.send(JSON.stringify({ type: 'error', error }))
	}
}

//playerPicksUpItemService handles picking up a single item and all items
export const playerPicksUpItemService = async (data, ws) => {
	try {
		const { playerId, itemId, areaId, command2 } = data

		if (command2 === 'all') {
			const allItemsInRoom = await Item.findAll({
				where: { ownerId: areaId, ownerType: 'area' },
			})
			if (!allItemsInRoom) throw new Error(`Items not found`)
			await Promise.all(allItemsInRoom.map(item => Item.update({ ownerId: playerId, ownerType: 'player', location: 'inventory' }, { where: { id: item.id }, returning: true })))
			const updatedItems = await Item.findAll({
				where: { ownerId: playerId, ownerType: 'player' },
				include: [Weapon, Armor],
			})
			ws.send(JSON.stringify({ type: 'playerAction', action: 'playerPicksUpAllItems', items: updatedItems }))
		}

		if (itemId) {
			const specifiedItem = await Item.findOne({
				where: {
					id: itemId,
					ownerId: areaId,
					ownerType: 'area',
				},
				include: [Weapon, Armor],
			})
			if (!specifiedItem) throw new Error(`Item not found`)
			await specifiedItem.update({
				ownerId: playerId,
				ownerType: 'player',
				location: 'inventory',
			})
			ws.send(JSON.stringify({ type: 'playerAction', action: 'playerPicksUpItem', item: specifiedItem }))
		}
	} catch (error) {
		console.error(`Error: `, error)
		ws.send(JSON.stringify({ type: 'error', message: error.message }))
	}
}
