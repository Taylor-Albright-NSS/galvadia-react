import Armor from '../../models/armor.js'
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

export const playerUpdateAllAttributes = async (playerId, ws) => {
	const player = await Player.findByPk(playerId, {
		include: [{ model: PlayerClass }, { model: PlayerRace }],
	})
	const allPlayerItems = await Item.findAll({ where: { ownerId: playerId, ownerType: 'player' }, include: [{ model: Weapon }, { model: Armor }] })

	const playerEquippedItems = allPlayerItems.filter(item => (item.templateType === 'weapon' && (item.location === 'leftHand' || item.location === 'rightHand')) || (item.templateType === 'armor' && item.location === item.Armor.slot))
	const classAttributes = playerCalculateClassAttributes(player)
	const raceAttributes = playerCalculateRaceAttributes(player)
	let equipmentAttributes = {}
	let totalAttributes = {}

	playerEquippedItems.forEach(item => {
		const { attributes } = item?.Weapon?.bonuses || item?.Armor?.bonuses || {}
		if (attributes) {
			for (const attribute in attributes) {
				equipmentAttributes[attribute] = (equipmentAttributes[attribute] || 0) + (attributes[attribute] || 0)
			}
		}
	})

	for (const attribute in classAttributes) {
		totalAttributes[attribute] = (totalAttributes[attribute] || 0) + (classAttributes[attribute] || 0) + (raceAttributes[attribute] || 0) + (equipmentAttributes[attribute] || 0)
	}

	player.update({ attributes: totalAttributes })
	ws.send(JSON.stringify({ type: 'playerModify', action: 'updateAllAttributes', attributes: totalAttributes }))
}

export const playerCalculateClassAttributes = player => {
	const { strength, dexterity, agility, constitution, intelligence, wisdom, mysticism } = player.PlayerClass
	return { strength, dexterity, agility, constitution, intelligence, wisdom, mysticism }
}
export const playerCalculateRaceAttributes = player => {
	const { strength, dexterity, agility, constitution, intelligence, wisdom, mysticism } = player.PlayerRace
	return { strength, dexterity, agility, constitution, intelligence, wisdom, mysticism }
}
