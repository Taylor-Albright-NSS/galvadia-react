import { Op } from 'sequelize'
import { broadcastToRoom } from '../broadcasts/broadcast.js'
import { getGameData } from '../_controllers/gameStateController.js'
import { playerItemInHandsCheck, playerRoomTransition } from '../_controllers/playerController.js'
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
import { npcMapper } from '../utils/npcUtils.js'
import { helpGetAllConnectedPlayerIds } from '../helpers/helpers.js'
import { serializePlayerFull } from '../models/dtos/serializerPlayer.js'
import { getPlayerWeapons, swingBuilderUtil } from '../utils/playerUtils.js'
import { GamePlayer } from '../services/GamePlayer.js'
import { generateEnemyDrops } from '../utils/itemUtils.js'

export const playerRoomTransitionService = async (data, ws, wss) => {
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
	const updatedPlayer = await playerRoomTransition(newData, wss)
	const gameData = { playerId: updatedPlayer.id, areaId: updatedPlayer.area_id }
	const updatedGameData = await getGameData(gameData)
	ws.send(JSON.stringify({ type: 'playerAction', action: 'playerRoomTransition', updatedPlayer, updatedGameData }))
	broadcastToRoom(wss, updatedPlayer, newData.areaId)
}

export const playerRegularAttackService = async (data, ws, wss) => {
	try {
		const { playerId, enemyId } = data
		console.log(1)
		const player = await Player.findByPk(playerId)
		if (!player) throw new Error(`Error finding player by id`)
		console.log(2)

		const enemy = await Enemy.findByPk(enemyId)
		if (!enemy) throw new Error(`Error finding enemy by id`)
		console.log(3)

		const weapons = await getPlayerWeapons(player.id)
		console.log(4)
		const swingBuilder = await swingBuilderUtil(player, weapons)
		console.log(5)

		const gamePlayer = new GamePlayer(player, { weapons })
		if (!gamePlayer) throw new Error(`Error creating GamePlayer`)

		const weaponsByLocation = {}
		for (const weapon of weapons) {
			weaponsByLocation[weapon.location] = weapon
		}

		for (const swing of swingBuilder) {
			const weaponSwung = weaponsByLocation[swing] || weapons[0]
			const damageObject = gamePlayer.calculateDamageAgainstEnemy(enemy, weaponSwung)
			const { actualDamage } = damageObject
			enemy.health = Math.max(enemy.health - actualDamage, 0)
			await enemy.save()
			ws.send(JSON.stringify({ type: 'playerAction', action: 'playerAttackHitsEnemy', enemy, damageObject }))
			if (enemy.health <= 0) break
		}

		if (enemy.health <= 0) {
			const loot = (await generateEnemyDrops(enemy)) || []
			if (!loot) {
				throw new Error(`Error generating loot`)
			}
			// console.log(loot, ' loot')
			if (enemy.loot.length > 0) {
				loot.push(...enemy.loot)
			}

			const gainedExperience = enemy.experience || 0
			await enemy.destroy()
			await player.update({
				experience: player.experience + gainedExperience,
			})
			console.log(loot, ' LOOT')
			ws.send(JSON.stringify({ type: 'enemyAction', action: 'enemyDies', enemy, experience: gainedExperience, loot }))
		} else {
			//BATCH SEND HERE INSTEAD OF INDIVIDUAL SENDS IN THE FOR LOOP
			// await enemy.save()
			// ws.send(JSON.stringify({ type: 'enemyAction', action: 'enemyTakesDamage', enemy, damage: playerDamage }))
		}
	} catch (error) {
		console.error(error)
		ws.send(JSON.stringify({ type: 'error', message: error.message }))
	}
}

export const playerAdvancesEnemyService = async (data, ws, wss) => {
	try {
		const { playerId, enemyId } = data
		const player = await Player.findByPk(playerId)
		const enemy = await Enemy.findByPk(enemyId)

		if (!player) {
			throw new Error(`Cannot find player`)
		}
		if (!enemy) {
			throw new Error(`Cannot find enemy`)
		}

		if (!enemy.playerCombatIds.some(id => id === playerId)) {
			enemy.playerCombatIds = [...enemy.playerCombatIds, playerId]
			enemy.save()
			ws.send(JSON.stringify({ type: 'playerAction', action: 'playerAdvancesEnemy', enemy }))
		}
	} catch (error) {
		ws.send(JSON.stringify({ type: 'error', message: 'Error advancing the enemy' }))
		console.error(`Backend error: `, error)
	}
}

export const playerRetreatsService = async (data, ws, wss) => {
	try {
		const { playerId, areaId } = data
		const allEnemies = await Enemy.findAll({ where: { area_id: areaId } })
		console.log(allEnemies, ' ALL ENEMIES')
		if (!allEnemies) {
			throw new Error('Error retrieving all enemies')
		}
		const playerIsInCombat = allEnemies.some(({ playerCombatIds }) => playerCombatIds.includes(playerId))
		if (!playerIsInCombat) {
			console.log('Player is not in combat. No retreat happens')
			return
		}
		const updatedEnemies = await Promise.all(
			allEnemies.map(async enemy => {
				const [_, [updatedEnemy]] = await Enemy.update({ playerCombatIds: enemy.playerCombatIds.filter(id => id !== playerId) }, { where: { id: enemy.id }, returning: true })
				return updatedEnemy
			})
		)
		ws.send(JSON.stringify({ type: 'playerAction', action: 'playerRetreats', enemies: updatedEnemies }))
	} catch (error) {
		ws.send(JSON.stringify({ type: 'error', message: 'Failed to retreat' }))
		console.error(`Error: `, error)
	}
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
	// await playerUpdateAllAttributes(playerId, ws)
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

		// await playerUpdateAllAttributes(playerId, ws)
		ws.send(JSON.stringify({ type: 'playerAction', action: 'playerRemovesArmor', item }))
	} catch (error) {
		console.error(error)
		ws.send(JSON.stringify({ type: 'error', error }))
	}
}

export const playerSpeaksToNpcService = async (data, ws) => {
	const { playerId, npcId, areaId } = data
	try {
		let playerNpc = await PlayerNpc.findOne({ where: { playerId, npcId } })
		if (!playerNpc && (isNaN(playerId) || isNaN(npcId))) {
			throw new Error(`Invalid PlayerNpc`)
		}

		if (!playerNpc) {
			const modelNpc = await Npc.findByPk(npcId)
			let playerNpc
			console.log(6)
			if (modelNpc.behavior === 'event') {
				playerNpc = await PlayerNpc.create({ name: modelNpc.name, playerId: playerId, npcId: npcId, area_id: areaId, eventStage: 1 })
			} else {
				playerNpc = await PlayerNpc.create({ name: modelNpc.name, playerId: playerId, npcId: npcId, area_id: areaId })
			}
		}
		const npcDialogue = await NpcDialogue.findOne({
			where: {
				npcId,
				dialogueStage: playerNpc.dialogueStage,
			},
		})
		console.log(npcId, ' NPC ID')
		console.log(playerNpc.dialogueStage, ' playerNpc.dialogueStage')
		console.log(playerNpc, ' playerNpc in question')

		if (!npcDialogue) throw new Error(`Dialogue not found`)

		const npc = await Npc.findByPk(npcId)

		if (!npc) throw new Error(`Npc not found`)

		const dialogueArray = npcDialogue.dialogue
		const dialogueIndex = playerNpc.dialogueIndex % dialogueArray.length
		const dialogue = dialogueArray[dialogueIndex]
		playerNpc.dialogueIndex = (dialogueIndex + 1) % dialogueArray.length

		await playerNpc.save()
		ws.send(JSON.stringify({ type: 'playerAction', action: 'playerSpeaksToNpc', dialogue, npc }))

		if (npc.behavior === 'event') {
			console.log(npc, ' NPC')
			const payload = await npcMapper[npc.name](playerNpc, npc.name, areaId, ws)
			if (payload) {
				return ws.send(JSON.stringify({ type: payload.type, action: payload.action, payload }))
			}
		}
	} catch (error) {
		console.error(`Error: `, error)
		ws.send(JSON.stringify({ type: 'error', message: error.message }))
	}
}

// export const playerSpeaksNpcUnlocksDirection = async (req, res) => {
// 	try {
// 		const { playerId, npcId, areaId } = req.body
// 		console.log(playerId, npcId, areaId, ' playerId, npcId, areaId')
// 		const playerNpc = await PlayerNpc.findOne({ where: { playerId, npcId } })
// 		if (!playerNpc) {
// 			throw new Error(`PlayerNpc could not be found`)
// 		}
// 		playerNpc.dialogueStage++
// 		await playerNpc.save()
// 		await PlayerArea.create({
// 			playerId,
// 			area_id: areaId,
// 			unblockedDirections: {
// 				west: true,
// 			},
// 		})
// 	} catch (error) {
// 		console.error(`Error: `, error)
// 		ws.send(JSON.stringify({ type: 'error', error }))
// 	}
// }

export const playerLooksService = async (data, ws) => {
	try {
		const { playerId, areaId } = data
		const onlineIds = await helpGetAllConnectedPlayerIds(playerId)

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
			Player.findAll({ where: { area_id: areaId, id: { [Op.in]: onlineIds, [Op.ne]: playerId } } }),
			PlayerNpc.findAll({ where: { playerId } }),
		])
		const missingNpcs = baseNpcs.filter(npc => !playerNpcs.some(playerNpc => playerNpc.npcId === npc.id))
		await Promise.all(
			missingNpcs.map(async npc => {
				console.log(npc, ' this is the missing npc to add')
				const modelNpc = await Npc.findByPk(npc.id)
				let playerNpc
				if (modelNpc.behavior === 'event') {
					playerNpc = await PlayerNpc.create({ name: modelNpc.name, playerId: playerId, npcId: npc.id, area_id: areaId, eventStage: 1 })
				} else {
					playerNpc = await PlayerNpc.create({ name: modelNpc.name, playerId: playerId, npcId: npc.id, area_id: areaId })
				}
				console.log(playerNpc, ' newly created playerNpc')
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
		const player = await serializePlayerFull(playerId)
		ws.send(JSON.stringify({ type: 'playerAction', action: 'playerPacksItem', item: itemToPack, player }))
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
		const updatedPlayer = await serializePlayerFull(playerId)
		ws.send(JSON.stringify({ type: 'playerAction', action: 'playerUnpacksItem', item: itemToUnpack, player: updatedPlayer }))
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
