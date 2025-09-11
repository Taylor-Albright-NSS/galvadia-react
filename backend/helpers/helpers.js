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
