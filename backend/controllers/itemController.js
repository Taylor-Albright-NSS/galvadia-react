import { npcDTO } from '../models/dtos/npcDTO.js'
import { Item } from '../models/item.js'
import Weapon from '../models/weapon.js'
import WeaponTemplate from '../models/weaponTemplate.js'
import { generateWeapon } from '../utils/itemUtils.js'
import { wss } from '../websocket.js'

export const getItems = async (req, res) => {
	try {
		const [allItems, allWeapons] = await Promise.all([Item.findAll()])
		res.status(200).json(items)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const getAllItems = async (data, ws, wss) => {
	try {
		const items = Item.findAll({})
	} catch (error) {}
}

export const getCurrentAreaItems = async (req, res) => {
	const { areaId } = req.params
	try {
		const items = await Item.findAll({ where: { ownerId: areaId, ownerType: 'area' } })
		res.status(200).json(items)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
export const putCurrentAreaItemsToPlayer = async (req, res) => {
	console.log(`Current WebSocket Clients: ${wss.clients.size}`)
	try {
		const itemsArray = req.body
		const { playerId } = req.query
		if (itemsArray.length === 0) {
			console.log(`Current WebSocket Clients: ${wss.clients.size}`)
			return res.status(404).json({ message: 'No items to pick up' })
		}
		console.log(`Current WebSocket Clients: ${wss.clients.size}`)

		const [_, [updatedItems]] = await Promise.all(
			itemsArray.map(async item => {
				const updatedItem = await Item.update({ ownerId: playerId, ownerType: 'player', location: 'inventory' }, { where: { id: item.id }, returning: true })
				return updatedItem
			})
		)
		console.log(`Current WebSocket Clients: ${wss.clients.size}`)

		wss.clients.forEach(client => {
			console.log('Websocket is OPEN!')
			if (client.readyState === WebSocket.OPEN) {
				client.send(
					JSON.stringify({
						event: 'itemRemoved',
						pickedBy: playerId,
					})
				)
			}
		})

		return res.status(200).json(updatedItems)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const postSpawnItemToPlayer = async (playerId, name, keywords, ws) => {
	try {
		const item = await Item.create({ name, ownerId: playerId, ownerType: 'player', keywords, location: 'inventory' })
		console.log(item, ' item')
		if (!item) {
			throw new Error(`Item failed to be created`)
		}
		return ws.send(JSON.stringify({ type: 'itemAction', action: 'itemToPlayer', item }))
	} catch (error) {
		console.error(`Error: `, error)
		return ws.send(JSON.stringify({ type: 'error', message: "Internal server error. I think it's because of the unique ID contraint" }))
	}
}
export const postAreaKeywordSpawn = async (req, res) => {
	const { areaId } = req.params
	const { keywordSpecial } = req.body
	const { name, ownerId, ownerType, keywords } = keywordSpecial
	const item = await Item.create({ name: name, ownerId: ownerId, ownerType: ownerType, keywords: keywords })
	if (!item) {
		return res.status(500).json({ message: 'Item failed to be created' })
	}
	return res.status(201).json(item)
}

export const postNewItem = async (req, res) => {
	//Dev Window test endpoint
	try {
		const item = await Item.create({ name: 'Twohanded Sword', ownerId: 1, ownerType: 'area', isTwoHanded: true, keywords: ['twohanded', 'sword', 'twohanded sword'] })
		return res.status(201).json(item)
	} catch (error) {
		return res.status(500).json({ message: 'Internal error' })
	}
}

//--------These functions will spawn a weapon in the room that the player is currently in
export const postTwohandedSword = async (req, res) => {
	const { areaId } = req.params
	console.log(areaId, ' areaId')
	try {
		const item = await Item.create({ name: 'Twohanded Sword', ownerId: areaId, ownerType: 'area', isTwoHanded: true, keywords: ['twohanded', 'sword', 'twohanded sword'] })
		if (!item) {
			return res.status(400).json({ message: 'Item could not be created' })
		}
		return res.status(201).json(item)
	} catch (error) {
		return res.status(500).json({ message: 'Internal error' })
	}
}

export const postOnehandedSword = async (req, res) => {
	const { areaId } = req.params
	try {
		const weaponTemplate = await WeaponTemplate.findByPk(1)
		const item = await generateWeapon(weaponTemplate, 1)
		if (!item) {
			throw new Error('Weapon could not be created')
		}
		const weaponToSend = await Item.findOne({ where: { id: item.id }, include: [{ model: Weapon }] })
		// const item = await Item.create({ name: 'Onehanded Sword', ownerId: areaId, ownerType: 'area', keywords: ['onehanded', 'sword', 'onehanded sword'] })
		// const weapon = await Weapon.create({})
		return res.status(201).json(weaponToSend)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const postDagger = async (req, res) => {
	const { areaId } = req.params
	try {
		const item = await Item.create({ name: 'Dagger', ownerId: areaId, ownerType: 'area', keywords: ['dagger'] })
		return res.status(201).json(item)
	} catch (error) {
		return res.status(500).json({ message: 'Internal error' })
	}
}

export const postCrossbow = async (req, res) => {
	const { areaId } = req.params
	console.log(areaId, ' areaId for crossbow')
	try {
		const item = await Item.create({ name: 'Crossbow', ownerId: areaId, ownerType: 'area', isTwoHanded: true, keywords: ['crossbow'] })
		return res.status(201).json(item)
	} catch (error) {
		return res.status(500).json({ message: 'Internal error' })
	}
}

export const deleteAllItems = async (req, res) => {
	try {
		const [allItems, allWeapons] = await Promise.all([Item.findAll(), Weapon.findAll()])

		await Promise.all([...allItems.map(item => item.destroy()), ...allWeapons.map(weapon => weapon.destroy())])
		if (allItems.length === 0 && allWeapons.length === 0) {
			return res.status(404).json({ message: 'All items not found' })
		}
		return res.status(200).json({ message: 'All items have been destroyed' })
	} catch (err) {
		return res.status(500).json({ message: 'Internal server error' })
	}
}
