import { Keyword } from '../models/keyword.js'
import { Npc } from '../models/npc.js'
import Player from '../models/player.js'
import Area from '../models/area.js'
import Item from '../models/item.js'
import Weapon from '../models/weapon.js'

export const areaAnticipatedService = async (data, ws) => {
	try {
		const { x, y } = data
		const area = await Area.findOne({
			where: { x, y },
			include: [{ model: Npc }, { model: Player }, { model: Keyword }],
		})
		if (!foundArea) {
			throw new Error(`Anticipated area not found`)
		}
		ws.send(JSON.stringify({ type: 'areaAction', action: 'anticipatedArea', area }))
	} catch (error) {
		console.error(`Error: `, error)
		ws.send(JSON.stringify({ type: 'error', message: error.message }))
	}
}

export const currentAreaItemsService = async (data, ws) => {
	try {
		console.log(data, ' currentAreaItemsService DATA')
		const { playerId, areaId } = data
		console.log(playerId, areaId, ' playerId --- areaId')
		const items = await Item.findAll({
			where: { ownerId: areaId, ownerType: 'area' },
		})
		if (!items) {
			throw new Error(`Items not found`)
		}

		// const [_, [updatedItems]] = await Promise.all(
		// 	items.map(async item => {
		// 		const updatedItem = await Item.update({ ownerId: playerId, ownerType: 'player', location: 'inventory' }, { where: { id: item.id }, returning: true })
		// 		return updatedItem
		// 	})
		// )

		await Promise.all(items.map(item => Item.update({ ownerId: playerId, ownerType: 'player', location: 'inventory' }, { where: { id: item.id }, returning: true })))

		const updatedItems = await Item.findAll({
			where: { ownerId: playerId, ownerType: 'player' },
			include: [{ model: Weapon }],
		})

		console.log(updatedItems, ' updated items')
		ws.send(JSON.stringify({ type: 'itemAction', action: 'currentAreaItems', items: updatedItems }))
	} catch (error) {
		console.error(`Error: `, error)
		ws.send(JSON.stringify({ type: 'error', message: error.message }))
	}
}
