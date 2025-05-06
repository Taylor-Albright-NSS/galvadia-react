import Player from '../models/player.js'
import { Op } from 'sequelize'
import { sequelize } from '../config/db.js'
import { Item } from '../models/item.js'
import { Enemy } from '../models/enemy.js'
import { GamePlayer } from '../services/GamePlayer.js'
import { enemyDies } from './enemyController.js'

export let players = {}
// prettier-ignore
export const playerRetreats = async (data, ws, wss) => {
  try {
    const { playerId, areaId } = data
    const allEnemies = await Enemy.findAll({ where: { area_id: areaId } })
    console.log(allEnemies, " ALL ENEMIES")
    if (!allEnemies) {
      throw new Error("Error retrieving all enemies")
    }
    const playerIsInCombat = allEnemies.some(({ playerCombatIds }) => playerCombatIds.includes(playerId))
    if (!playerIsInCombat) { 
      console.log("Player is not in combat. No retreat happens")
      return 
    }
    const updatedEnemies = await Promise.all(
      allEnemies.map(async (enemy) => {
      const [_, [updatedEnemy]] = await Enemy.update(
        { playerCombatIds: enemy.playerCombatIds.filter(id => id !== playerId) },
        { where: { id: enemy.id }, returning: true }
      )
      return updatedEnemy
    }))
    ws.send(JSON.stringify({ type: "playerAction", action: "playerRetreats", enemies: updatedEnemies }))

  } catch(error) {
    ws.send(JSON.stringify({ type: "error", message: "Failed to retreat" }))
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
	const { playerId, enemyId } = data
	const player = await Player.findByPk(playerId)
	const enemy = await Enemy.findByPk(enemyId)

	const gamePlayer = new GamePlayer(player)
	const playerDamage = gamePlayer.rawDamage
	console.log(playerDamage, ' Player Damage')
	enemy.health = Math.max(enemy.health - playerDamage, 0)
	if (enemy.health <= 0) {
		console.log('Enemy dies here')
		await enemyDies(enemy, ws, wss)
		ws.send(JSON.stringify({ type: 'enemyAction', action: 'enemyDies', enemy, damage: playerDamage }))
	} else {
		console.log('Enemy takes damage and is still alive')
		enemy.save()
		ws.send(JSON.stringify({ type: 'enemyAction', action: 'enemyTakesDamage', enemy, damage: playerDamage }))
	}
}

export const playerRoomTransition = async (data, wss) => {
	try {
		const { id } = data.player
		console.log(id, ' player room transition player ID')
		const { x, y, area_id, oldAreaId } = data.combinedCoords
		const playerOldAreaId = oldAreaId
		let counter = 1
		wss.clients.forEach(client => {
			if (!players?.[counter]?.name) return
			let player = players[counter]
			if (player.id != parseInt(id)) {
				if (player.areaId === area_id) {
					client.send(JSON.stringify({ type: 'playerMoves', message: 'Player enters the room' }))
				}
			}
			counter++
		})
		const player = await Player.findOne({ where: { id: id } })
		player.x = x
		player.y = y
		player.area_id = area_id
		console.log(players, ' PLAYERS OBJECT')
		console.log(players[0], ' FIRST PLAYER')
		console.log(players[1], ' SECOND PLAYER')
		console.log(id, ' ID')
		players[id].areaId = area_id
		counter = 1
		wss.clients.forEach(client => {
			if (!players?.[counter]?.name) return
			if (players[counter].id != parseInt(id)) {
				if (playerOldAreaId === players[counter].areaId) {
					client.send(JSON.stringify({ type: 'playerMoves', message: 'Player leaves the room' }))
				}
			}
			counter++
		})
		await player.save()
		return player
	} catch (error) {
		console.log('Error message: ', error)
	}
}

export const createPlayer = async (req, res) => {
	const { name, area_id } = req.body
	try {
		const player = await Player.create({ name, area_id })
		res.status(201).json(player)
	} catch (error) {
		res.status(500).json({ error: 'Failed to create player' })
	}
}

export const playerGainsExperience = async data => {
	const { playerId, experienceGain } = data
	const player = await Player.findByPk(playerId)
	if (!player) {
		return res.status(404).json({ message: 'Player not found' })
	}
	player.experience = Math.max(player.experience + experienceGain, 0)
	player.level = player.levelCalc
	await player.save()
	return player
}
// export const playerGainsExperience = async (req, res) => {
//   const { playerId } = req.params
//   const { experienceGain } = req.body
//   const player = await Player.findByPk(playerId)
//   if (!player) {
//     return res.status(404).json({message: "Player not found"})
//   }
//   player.experience = Math.max(player.experience + experienceGain, 0)
//   player.level = player.levelCalc
//   player.save()
//   return res.status(200).json(player)
// }

export const getPlayer1API = async (req, res) => {
	try {
		const playerId = req.params.id
		const player = await Player.findByPk(playerId, {
			include: [{ model: sequelize.models.Area, as: 'Area' }],
		})
		const playerItems = await Item.findAll({ where: { ownerId: playerId, ownerType: 'player' } })
		player.dataValues.items = playerItems
		if (!player) {
			return res.status(404).json({ message: 'Player not found' })
		}

		res.json(player) // Send player data to the frontend
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
		const players = await Player.findAll({
			where: {
				area_id: areaId,
				id: {
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
		})
		if (!packedItem) {
			return res.status(404).json({ message: 'Player has nothing in that hand to pack' })
		}

		await packedItem.update({ location: 'inventory' })
		// if (playerId <= 0 || itemId <= 0) {return res.status(404).json({message: "playerId and/or itemId invalid"})}
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
		})
		//If unpacked item is not found -- fail
		if (!unpackedItem) {
			return res.status(404).json({ message: 'No item to unpack' })
		}
		//If one of player's hands is occupied and unpacked item is two-handed -- fail
		if ((!leftHandOpen || !rightHandOpen) && unpackedItem.isTwoHanded) {
			return res.status(422).json({ message: 'Both hands must be free in order to unpack a two-handed item' })
		}

		if (rightHandOpen && leftHandOpen && unpackedItem.isTwoHanded) {
			await unpackedItem.update({ location: 'both_hands' })
			return res.status(200).json({ unpackedItem, message: 'Item unpack to both hands' })
		} else if (rightHandOpen) {
			await unpackedItem.update({ location: 'right_hand' })
			return res.status(200).json({ unpackedItem, message: 'Item unpacked to right hand' })
		} else if (leftHandOpen) {
			await unpackedItem.update({ location: 'left_hand' })
			return res.status(200).json({ unpackedItem, message: 'Item unpacked to left hand' })
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
		const item = await Item.findByPk(itemId)
		if (!item) {
			return res.status(404).json({ message: 'Item not found' })
		}
		await item.update({ ownerId: areaId, ownerType: 'area', location: null })
		return res.status(200).json(item)
	} catch (error) {
		console.error(`Error dropping item`, error)
	}
}

const playerItemInHandsCheck = async playerId => {
	try {
		const playerFullInventory = await Item.findAll({
			where: { ownerType: 'player', ownerId: playerId },
		})
		const hands = {
			rightHandOpen: true,
			leftHandOpen: true,
		}
		playerFullInventory.forEach(item => {
			if (item.location == 'right_hand') hands.rightHandOpen = false
			if (item.location == 'left_hand') hands.leftHandOpen = false
			if (item.location == 'both_hands') {
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
