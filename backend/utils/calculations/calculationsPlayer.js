import Item from '../../models/item.js'
import Player from '../../models/player.js'
import { PlayerClass } from '../../models/playerClass.js'
import { PlayerRace } from '../../models/playerRace.js'
import Weapon from '../../models/weapon.js'

// export const playerCalculateAllAttributes = async (data, ws) => {
// 	const playerUpdatedAttributes = await playerCalculateAttributes(data, ws)
// 	ws.send(JSON.stringify({ type: 'retrievePlayerData', action: 'allAttributes', Attributes: totalAttributes }))
// 	// console.log(player, ' player with added class and race models')
// }

export const playerUpdateAllAttributes = async (data, ws) => {
	const { playerId } = data
	const player = await Player.findByPk(playerId, {
		include: [{ model: PlayerClass }, { model: PlayerRace }],
	})
	const allPlayerItems = await Item.findAll({ where: { ownerId: playerId, ownerType: 'player' }, include: [{ model: Weapon }] })

	const playerEquippedItems = allPlayerItems.filter(item => item.location !== 'inventory')
	const classAttributes = playerCalculateClassAttributes(player)
	const raceAttributes = playerCalculateRaceAttributes(player)
	let equipmentAttributes = {}
	let totalAttributes = {}

	playerEquippedItems.forEach(item => {
		if (item?.Weapon?.bonuses?.attributes) {
			for (const attribute in item.Weapon.bonuses.attributes) {
				equipmentAttributes[attribute] = (equipmentAttributes[attribute] || 0) + (item.Weapon.bonuses.attributes[attribute] || 0)
			}
		}
	})

	for (const attribute in classAttributes) {
		totalAttributes[attribute] = (totalAttributes[attribute] || 0) + (classAttributes[attribute] || 0) + (raceAttributes[attribute] || 0) + (equipmentAttributes[attribute] || 0)
	}

	console.log(totalAttributes, ' totalAttributes')
	player.update(totalAttributes)
	ws.send(JSON.stringify({ type: 'retrievePlayerData', action: 'allAttributes', attributes: totalAttributes }))
}

export const playerCalculateClassAttributes = player => {
	const { strength, dexterity, agility, constitution, intelligence, wisdom, mysticism } = player.PlayerClass
	return { strength, dexterity, agility, constitution, intelligence, wisdom, mysticism }
}
export const playerCalculateRaceAttributes = player => {
	const { strength, dexterity, agility, constitution, intelligence, wisdom, mysticism } = player.PlayerRace
	return { strength, dexterity, agility, constitution, intelligence, wisdom, mysticism }
}
