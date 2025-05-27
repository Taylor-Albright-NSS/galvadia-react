import { Op } from 'sequelize'
import Armor from '../models/armor.js'
import Item from '../models/item.js'
import Weapon from '../models/weapon.js'
import { playerFists } from '../services/playerFists.js'

export const getPlayerWeapons = async playerId => {
	let playerWeapons = await Item.findAll({
		where: {
			ownerId: playerId,
			ownerType: 'player',
			location: { [Op.in]: ['rightHand' || 'leftHand' || 'bothHands'] },
			templateType: 'weapon',
		},
		include: [Weapon],
	})
	console.log(playerWeapons, ' player weapons')
	if (playerWeapons.length === 0) {
		const { rightFist, leftFist } = playerFists
		playerWeapons = [rightFist, leftFist]
	}
	return playerWeapons
}

export const swingBuilderUtil = async (player, weapons) => {
	//check player skills here for multiple attacks
	let baseSwings = weapons.length === 2 ? ['rightHand', 'leftHand'] : [weapons[0].location]
	return baseSwings
}

export const generateSwingVerb = damageType => {
	switch (damageType) {
		case 'slashing':
			return 'swing'
		case 'piercing':
			return 'thrust'
		case 'blunt':
			return 'slam'
		default:
			'swing'
	}
}

export const generatePreposition = damageType => {
	console.log(damageType, ' damageType')
	switch (damageType) {
		case 'slashing':
			return 'at'
		case 'piercing':
			return 'into'
		case 'blunt':
			return 'into'
		default:
			return 'at'
	}
}
