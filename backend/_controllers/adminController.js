import { Op } from 'sequelize'
import { helpGetAllConnectedPlayerIds, helpGetAllConnectedUserIds } from '../helpers/helpers.js'
import Player from '../models/player.js'
import { User } from '../models/user.js'
import { connectedCharacters, connectedSockets } from '../websocket.js'

export const getAllConnectedWebSockets = async (req, res) => {
	try {
		const userWebSockets = Array.from(connectedSockets)

		if (!userWebSockets) throw Error(`Could not retrieve all connected users`)
		return res.status(200).json(userWebSockets)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}
export const getAllConnectedSockets = async (req, res) => {
	try {
		const userIds = helpGetAllConnectedUserIds()
		const users = await User.findAll({
			where: {
				id: {
					[Op.in]: userIds,
				},
			},
		})

		if (!users) throw Error(`Could not retrieve all connected users`)
		return res.status(200).json(users)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

export const getAllConnectedPlayers = async (req, res) => {
	try {
		const allPlayers = Array.from(connectedCharacters)
		return res.status(200).json(allPlayers)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}
export const getAllConnectedUsersMap = async (req, res) => {
	try {
		const users = Array.from(connectedSockets)
		return res.status(200).json(users)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}
