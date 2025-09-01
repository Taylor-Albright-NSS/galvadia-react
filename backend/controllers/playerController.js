import Player from '../models/player.js'
import { Op } from 'sequelize'
import { sequelize } from '../config/db.js'
import { Item } from '../models/item.js'
import { Enemy } from '../models/enemy.js'
import { GamePlayer } from '../services/GamePlayer.js'
import { enemyDies } from './enemyController.js'
import { generateEnemyDrops } from '../utils/itemUtils.js'
import { Weapon } from '../models/weapon.js'
import Area from '../models/area.js'
import { PlayerRace } from '../models/playerRace.js'
import { PlayerClass } from '../models/playerClass.js'
import Armor from '../models/armor.js'
import { playerUpdateAllAttributes } from '../utils/calculations/calculationsPlayer.js'
import { getPlayerWeapons, swingBuilderUtil } from '../utils/playerUtils.js'
import { helpGetAllPlayersInSameRoom } from '../helpers/helpers.js'

export let players = {}
// prettier-ignore

export const getUsersCharacters = async (req, res) => {
	const { id: userId } = req.params
	console.log('User ID:', userId)

	try {
		const characters = await Player.findAll({ where: { userId } })

		if (!characters || characters.length === 0) {
			return res.status(404).json({ error: 'No characters found for this user.' })
		}

		return res.status(200).json(characters)
	} catch (err) {
		console.error(`Error retrieving user's characters:`, err)
		return res.status(500).json({ error: 'Failed to retrieve characters.' })
	}
}
export const playerRetreats = async (data, ws, wss) => {
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

export const playerAdvancesEnemy = async (data, ws, wss) => {
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

export const playerRegularAttack = async (data, ws, wss) => {
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

export const playerRoomTransition = async (data, wss) => {
	try {
		const { x, y, areaId, previousAreaId, playerId } = data
		console.log(x, 'x', y, 'y', areaId, 'areaId', previousAreaId, 'previousAreaId', playerId, 'playerId')
		let counter = 1
		//REWRITE THE BELOW CODE TO CONSIDER THE NEW CONNECTEDCHARACTERS MAP
		// wss.clients.forEach(client => {
		// 	if (!players?.[counter]?.name) return
		// 	let player = players[counter]
		// 	if (player.id != parseInt(playerId)) {
		// 		if (player.areaId === areaId) {
		// 			client.send(JSON.stringify({ type: 'playerMoves', message: 'Player enters the room' }))
		// 		}
		// 	}
		// 	counter++
		// })
		const player = await Player.findOne({ where: { id: playerId } })
		console.log(players, ' PLAYERS')
		player.x = x
		player.y = y
		player.area_id = areaId
		//REWRITE THE BELOW CODE TO CONSIDER THE NEW CONNECTEDCHARACTERS MAP
		// players[playerId].areaId = areaId
		// counter = 1
		// wss.clients.forEach(client => {
		// 	if (!players?.[counter]?.name) return
		// 	if (players[counter].id != parseInt(playerId)) {
		// 		if (previousAreaId === players[counter].areaId) {
		// 			client.send(JSON.stringify({ type: 'playerMoves', message: 'Player leaves the room' }))
		// 		}
		// 	}
		// 	counter++
		// })
		await player.save()
		return player
	} catch (error) {
		console.log('Error message: ', error)
	}
}

export const createCharacter = async (req, res) => {
	const { name, raceId, classId } = req.body
	try {
		if (!name) throw new Error('Your character must have a name.')
		if (!classId) throw new Error('Your character must have a class.')
		if (!raceId) throw new Error('Your character must have a race.')
		const player = await Player.create({
			name,
			raceId,
			classId,
			userId: req.user.id,
		})
		console.log(player)

		res.status(201).json(player)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
}

export const playerGainsExperience = async (req, res) => {
	const { playerId } = req.params
	const { experienceGain } = req.body
	const player = await Player.findByPk(playerId)
	if (!player) {
		return res.status(404).json({ message: 'Player not found' })
	}
	player.experience = Math.max(player.experience + experienceGain, 0)
	player.level = player.levelCalc
	player.save()
	return res.status(200).json(player)
}

export const getPlayer1API = async (req, res) => {
	try {
		const playerId = req.params.id
		const player = await Player.findByPk(playerId, {
			include: [{ model: Area }, { model: PlayerRace }, { model: PlayerClass }],
		})
		console.log(player, ' player')
		const playerItems = await Item.findAll({
			where: { ownerId: playerId, ownerType: 'player' },
			include: [Weapon, Armor],
		})
		if (!playerItems) {
			return res.status(404).json({ message: 'Player items not found' })
		}
		player.dataValues.items = playerItems
		if (!player) {
			return res.status(404).json({ message: 'Player not found' })
		}

		res.status(200).json(player) // Send player data to the frontend
	} catch (error) {
		console.error('Error fetching player:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
}

export const getSelectedCharacter = async (req, res) => {
	const characterId = req.params.characterId
	const userId = req.user.id
	console.log(userId, ' userId')
	console.log(characterId, ' characterId')
	try {
		const character = await Player.findOne({
			where: { id: characterId, userId: userId },
			include: [{ model: Area }, { model: PlayerRace }, { model: PlayerClass }],
		})
		if (!character) {
			return res.status(404).json({ message: 'Player not found or someone is trying to log into a character that does not belong to them' })
		}
		const playerItems = await Item.findAll({
			where: { ownerId: characterId, ownerType: 'player' },
			include: [Weapon, Armor],
		})
		if (!playerItems) {
			return res.status(404).json({ message: 'Player items not found' })
		}
		character.dataValues.items = playerItems

		res.status(200).json(character) // Send player data to the frontend
	} catch (error) {
		console.error('Error fetching player:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
}

export const getPlayers = async (req, res) => {
	try {
		const players = await Player.findAll()
		res.status(200).json(players)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
export const getPlayersInRoom = async (req, res) => {
	const { playerId } = req.query
	const { areaId } = req.params
	try {
		const onlineIds = helpGetAllPlayersInSameRoom()
		if (onlineIds.length === 0) {
			return res.status(200).json([])
		}

		const players = await Player.findAll({
			where: {
				area_id: areaId,
				id: {
					[Op.in]: onlineIds,
					[Op.ne]: playerId,
				},
			},
		})
		res.status(200).json(players)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const deletePlayer = async (req, res) => {
	const { id } = req.params
	try {
		const playerToDelete = await Player.findOne({ where: { id: id } })
		if (!playerToDelete) {
			return res.status(404).json({ error: 'Player not found' })
		}
		await playerToDelete.destroy()
		res.status(204).send()
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete player' })
	}
}

export const putPlayer = async (req, res) => {
	const { id } = req.params
	const { name, area_id } = req.body
	try {
		const playerToChange = await Player.findOne({ where: { id: id } })
		if (!playerToChange) {
			res.status(404).json({ error: 'Player to change not found' })
		}
		await playerToChange.update({ name, area_id })
		res.status(200).json(playerToChange)
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}

export const getAllPlayerItems = async (req, res) => {
	try {
		const { playerId } = req.params
		const playerItems = await Item.findAll({
			where: {
				ownerId: playerId,
				ownerType: 'player',
			},
			include: [{ model: Weapon }, { model: Armor }],
		})
		if (!playerItems) {
			return res.status(204).json({ error: 'Player items not found' })
		}
		return res.status(200).json(playerItems)
	} catch (error) {
		console.error(`Error fetching items`, error)
		return res.status(500).json({ error: 'Internal server error' })
	}
}

export const patchPlayerPacksItem = async (req, res) => {
	try {
		const { playerId, itemId } = req.params

		const packedItem = await Item.findOne({
			where: {
				id: itemId,
				ownerId: playerId,
				ownerType: 'player',
			},
			include: [{ model: Weapon }, { model: Armor }],
		})
		if (!packedItem) {
			return res.status(404).json({ message: 'Player has nothing in that hand to pack' })
		}

		if (packedItem.templateType === 'weapon') {
			await playerUpdateAllAttributes(playerId, ws)
		}
		await packedItem.update({ location: 'inventory' })
		return res.status(200).json({ packedItem, message: 'You unpack your item' })
	} catch (error) {
		console.error(`Error packing item: `, error)
		return res.status(500).json({ message: 'Error packing item on the backend' })
	}
}

export const patchPlayerUnpacksItem = async (req, res) => {
	try {
		const { playerId, itemId } = req.params
		if (playerId <= 0 || itemId <= 0) {
			return res.status(404).json({ message: 'playerId and/or itemId invalid' })
		}
		const availableHands = await playerItemInHandsCheck(playerId)
		console.log(availableHands, ' Available hands')
		const { leftHandOpen, rightHandOpen } = availableHands
		//If both hands are occupied -- fail
		if (!leftHandOpen && !rightHandOpen) {
			return res.status(422).json({ message: "Player's hands are full" })
		}
		const unpackedItem = await Item.findOne({
			where: {
				id: itemId,
				ownerId: playerId,
				ownerType: 'player',
				location: 'inventory',
			},
			include: [{ model: Weapon }, { model: Armor }],
		})
		//If unpacked item is not found -- fail
		if (!unpackedItem) {
			return res.status(404).json({ message: 'No item to unpack' })
		}
		console.log(unpackedItem, ' unpackedItem')
		//If one of player's hands is occupied and unpacked item is two-handed -- fail
		if ((!leftHandOpen || !rightHandOpen) && unpackedItem.weaponSkill === 'twohanded') {
			return res.status(422).json({ message: 'Both hands must be free in order to unpack a two-handed item' })
		}

		if (rightHandOpen && leftHandOpen && unpackedItem.weaponSkill === 'twohanded') {
			await unpackedItem.update({ location: 'bothHands' })
			return res.status(200).json({ unpackedItem, message: 'Item unpack to both hands' })
		} else if (rightHandOpen) {
			await unpackedItem.update({ location: 'rightHand' })
			return res.status(200).json({ unpackedItem, message: 'Item unpacked to right hand' })
		} else if (leftHandOpen) {
			await unpackedItem.update({ location: 'leftHand' })
			return res.status(200).json({ unpackedItem, message: 'Item unpacked to left hand' })
		}
		if (unpackedItem.templateType === 'weapon') {
			await playerUpdateAllAttributes(playerId, ws)
		}
		// return res.status(200).json(unpackedItem)
	} catch (error) {
		console.error(`Error unpacking item: `, error)
		return res.status(500).json({ error: 'Error unpacking item' })
	}
}

export const patchPlayerDropsItem = async (req, res) => {
	try {
		const { areaId, itemId } = req.params
		const item = await Item.findByPk(itemId, {
			include: [{ model: Weapon }, { model: Armor }],
		})
		if (!item) {
			return res.status(404).json({ message: 'Item not found' })
		}
		//SEND PLAYER ID ON THE FRONT END THEN UNCOMMENT THIS OUT
		// if (packedItem.templateType === 'weapon') {
		// 	playerUpdateAllAttributes(playerId, ws)
		// }
		await item.update({ ownerId: areaId, ownerType: 'area', location: null })
		return res.status(200).json(item)
	} catch (error) {
		console.error(`Error dropping item`, error)
	}
}

export const playerItemInHandsCheck = async playerId => {
	try {
		const playerFullInventory = await Item.findAll({
			where: { ownerType: 'player', ownerId: playerId },
		})
		const hands = {
			rightHandOpen: true,
			leftHandOpen: true,
		}
		playerFullInventory.forEach(item => {
			if (item.location == 'rightHand') hands.rightHandOpen = false
			if (item.location == 'leftHand') hands.leftHandOpen = false
			if (item.location == 'bothHands') {
				hands.rightHandOpen = false
				hands.leftHandOpen = false
			}
		})
		return hands
	} catch (error) {
		console.error(`Error checking items in hand: `, error)
		return res.status(500).json({ message: 'Error checking items in hand' })
	}
}
