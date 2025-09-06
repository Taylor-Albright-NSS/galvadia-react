import { PlayerRace } from '../playerRace.js'
import { PlayerClass } from '../playerClass.js'
import Player from '../player.js'
import Area from '../area.js'
import Item from '../item.js'
import Weapon from '../weapon.js'
import Armor from '../armor.js'
import { helperRetrievePlayerAttributesEquipment, helperRetrieveCharacterFull } from '../../helpers/player.js'

export async function serializePlayerFull(characterId) {
	console.log(characterId, ' characterId')
	const { character, characterItems } = await helperRetrieveCharacterFull(characterId)
	const eqAttributes = await helperRetrievePlayerAttributesEquipment(characterId)
	const validAttributes = ['strength', 'dexterity', 'agility', 'constitution', 'intelligence', 'wisdom', 'mysticism']
	const totalAttributes = {}

	for (const attr of validAttributes) {
		totalAttributes[attr] = (character.baseAttributes[attr] || 0) + (character.allocatedAttributes[attr] || 0) + (eqAttributes[attr] || 0)
	}

	const serializedPlayer = {
		id: character.id,
		name: character.name,
		area_id: character.area_id,
		level: character.level,
		attributes: totalAttributes,
		stats: {
			healthMax: await character.getMaxHealth(),
			manaMax: await character.getMaxMana(),
			healthCurrent: character.healthCurrent,
			manaCurrent: character.manaCurrent,
			weight: character.weight,
			burden: character.burden,
		},
		// attackPower: await player.getAttackPower(),
		class: character.PlayerClass.name,
		race: character.PlayerRace.name,
		inventory: characterItems,
		x: character.x,
		y: character.y,
		z: character.z,
		s: character.s,
		experience: character.experience,
		gold: character.gold,
	}
	return serializedPlayer
}

export async function serializePlayerAttributes(characterId) {
	const player = serializePlayerFull(characterId)
}

//ENDPOINT VERSION -- CAN HIT THE ENDPOINT TO GET VALUES ON THIS FUNCTION FOR TESTING
export async function serializePlayerTest(req, res) {
	const characterId = req.params.id
	const { character, characterItems } = await helperRetrieveCharacterFull(characterId)
	console.log(characterId, ' characterId')
	console.log(character, ' character')
	const eqAttributes = await helperRetrievePlayerAttributesEquipment(characterId)
	const validAttributes = ['strength', 'dexterity', 'agility', 'constitution', 'intelligence', 'wisdom', 'mysticism']

	const totalAttributes = {}
	for (const attr of validAttributes) {
		totalAttributes[attr] = (character.baseAttributes[attr] || 0) + (character.allocatedAttributes[attr] || 0) + (eqAttributes[attr] || 0)
	}

	const serializedPlayer = {
		id: character.id,
		name: character.name,
		area_id: character.area_id,
		level: character.level,
		attributes: totalAttributes,
		stats: {
			healthMax: await character.getMaxHealth(),
			manaMax: await character.getMaxMana(),
			healthCurrent: character.healthCurrent,
			manaCurrent: character.manaCurrent,
			weight: character.weight,
			burden: character.burden,
		},
		// attackPower: await player.getAttackPower(),
		class: character.PlayerClass.name,
		race: character.PlayerRace.name,
		inventory: characterItems,
		x: character.x,
		y: character.y,
		z: character.z,
		s: character.s,
		experience: character.experience,
		gold: character.gold,
	}
	return res.status(200).json(serializedPlayer)
}
