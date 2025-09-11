import Area from '../models/area.js'
import Armor from '../models/armor.js'
import Item from '../models/item.js'
import Player from '../models/player.js'
import { PlayerClass } from '../models/playerClass.js'
import { PlayerRace } from '../models/playerRace.js'
import Weapon from '../models/weapon.js'

export async function helperRetrieveCharacterFull(characterId) {
	const character = await Player.findByPk(characterId, { include: [{ model: Area }, { model: PlayerRace }, { model: PlayerClass }] })
	const characterItems = await Item.findAll({ where: { ownerId: characterId, ownerType: 'player' }, include: [Weapon, Armor] })
	return { character, characterItems }
}

export async function helperRetrievePlayerAttributesEquipment(playerId) {
	const items = await Item.findAll({ where: { ownerId: playerId, ownerType: 'player' }, include: [Weapon, Armor] })
	const playerEquippedItems = items.filter(item => (item.templateType === 'weapon' && (item.location === 'leftHand' || item.location === 'rightHand')) || (item.templateType === 'armor' && item.location === item.Armor.slot))
	const validAttributes = ['strength', 'dexterity', 'agility', 'constitution', 'intelligence', 'wisdom', 'mysticism']
	const aggAttributes = {
		strength: 0,
		dexterity: 0,
		agility: 0,
		constitution: 0,
		intelligence: 0,
		wisdom: 0,
		mysticism: 0,
	}

	for (const item of playerEquippedItems) {
		//Sword.Weapon.bonuses.attributes
		for (const attr of validAttributes) {
			console.log(attr, ' ATTR')
			console.log(item.Weapon.bonuses.attributes, ' ITEM.WEAPON.BONUSES.ATTRIBUTES')
			if (item?.Weapon?.bonuses?.attributes?.[attr]) {
				const bonus = item.Weapon.bonuses.attributes[attr]
				console.log(bonus, ' BONUS')

				aggAttributes[attr] += bonus
			}
		}
	}
	console.log(aggAttributes, ' aggAttributes')
	return aggAttributes
}
