import { Op } from 'sequelize'
import Player from '../models/player.js'
import { connectedCharacters, connectedSockets } from '../websocket.js'

export const helpGetAllConnectedUserIds = () => {
	try {
		const userIds = Array.from(connectedSockets.keys())
		if (!userIds) throw Error(`Could not retrieve user ids`)
		return userIds
	} catch (err) {
		console.error(`Error:`, err)
		return err
	}
}
export const helpGetAllConnectedPlayerIds = () => {
	try {
		const characterIds = Array.from(connectedCharacters.keys())
		console.log(characterIds, ' all connected player ids+')
		if (!characterIds) throw Error(`Could not retrieve player ids`)
		return characterIds
	} catch (err) {
		console.error(`Error:`, err)
		return err
	}
}

export const helpGetAllPlayersInSameRoom = async characterId => {
	try {
		const player = await Player.findByPk(characterId)
		console.log(player, ' player+')
		if (!player) throw Error(`Could not find player`)
		const allPlayerIds = helpGetAllConnectedPlayerIds()
		console.log(allPlayerIds, ' allPlayerIds')
		if (!allPlayerIds) throw Error(`Could not find allPlayerIds`)
		const allPlayersInSameRoom = await Player.findAll({
			where: {
				area_id: player.area_id,
				id: { [Op.in]: allPlayerIds, [Op.ne]: player.id },
			},
		})
		console.log(allPlayersInSameRoom, ' allPlayersInSameRoom')
		if (!allPlayersInSameRoom) throw Error(`Could not find allPlayersInSameRoom`)

		return allPlayersInSameRoom
	} catch (err) {
		console.error(`Error:`, err)
		return err
	}
}

export async function serializePlayer(req, res) {
	const characterId = req.params.id
	const player = await Player.findByPk(characterId, {
		include: [{ model: Area }, { model: PlayerRace }, { model: PlayerClass }],
	})
	const playerItems = await Item.findAll({
		where: { ownerId: characterId, ownerType: 'player' },
		include: [Weapon, Armor],
	})
	const serializedPlayer = {
		id: player.id,
		area_id: player.area_id,
		name: player.name,
		level: player.level,
		attributes: player.attributes,
		stats: await player.getAttributes(),
		maxHealth: await player.getMaxHealth(),
		// attackPower: await player.getAttackPower(),
		class: player.PlayerClass.name,
		race: player.PlayerRace.name,
		inventory: playerItems,
	}
	return res.status(200).json(serializedPlayer)
}
