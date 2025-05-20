import { Weapon } from '../models/weapon.js'
import WeaponTemplate from '../models/weaponTemplate.js'
import EnemyType from '../models/enemyType.js'
import LootTableEntry from '../models/lootTableEntry.js'
import { sequelize } from '../config/db.js'
import Item from '../models/item.js'

export const randomNumberRange = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export const generateWeapon = async (weaponTemplate, enemyAreaId) => {
	const transaction = await sequelize.transaction()
	try {
		const { name, id, templateType, damageType, weight, sellValue, isTwoHanded, description, keywords, bonuses } = weaponTemplate
		const templateId = id
		const ownerType = 'area'
		const ownerId = enemyAreaId
		const minDamage = randomNumberRange(weaponTemplate.minDamageMin, weaponTemplate.maxDamageMin)
		const maxDamage = randomNumberRange(weaponTemplate.minDamageMax, weaponTemplate.maxDamageMax)

		const item = await Item.create(
			{
				name,
				ownerId,
				ownerType,
				templateId,
				templateType,
				// description,
				// sellValue,
				// weight,
				keywords,
			},
			{ transaction }
		)
		console.log(item, ' item')
		const generatedWeapon = await Weapon.create(
			{
				// ownerId,
				// ownerType,
				// templateId,
				// templateType,
				itemId: item.id,
				name,
				ownerId,
				ownerType,
				damageType,
				minDamage,
				maxDamage,
				bonuses,
				weight,
				sellValue,
				isTwoHanded,
				keywords,
				description,
			},
			{ transaction }
		)
		console.log(generatedWeapon, ' gen weapon')
		item.dataValues.weapon = generatedWeapon
		item.setDataValue('weapon', generatedWeapon)

		await transaction.commit()
		return item
	} catch (error) {
		await transaction.rollback()
		throw error
	}
}

export const itemFactory = async (lootTableEntry, enemyAreaId) => {
	let generatedItem
	if (lootTableEntry.templateType === 'weapon') {
		const template = await WeaponTemplate.findByPk(lootTableEntry.templateId)
		generatedItem = await generateWeapon(template, enemyAreaId)
	}

	return generatedItem
}

export const generateEnemyDrops = async enemy => {
	try {
		const enemyTypeId = enemy.enemyTypeId
		const enemyAreaId = enemy.area_id
		const enemyType = await EnemyType.findOne({ where: { id: enemyTypeId } })
		if (!enemyType) {
			throw new Error(`Enemy Type not found`)
		}
		console.log(enemyType, ' enemyType')
		const lootEntries = await LootTableEntry.findAll({ where: { lootTableId: enemyType.lootTableId } })
		if (!lootEntries) {
			throw new Error(`Loot Entries not found`)
		}
		console.log(lootEntries, ' lootEntries')

		const generatedLoot = []

		for (const lootTableEntry of lootEntries) {
			const chance = lootTableEntry.dropChance
			const roll = Math.random() * 100

			if (roll < chance) {
				let lootDrop = await itemFactory(lootTableEntry, enemyAreaId)
				// let generatedItem
				// if (entry.templateType === 'weapon') {
				// 	const template = await WeaponTemplate.findByPk(entry.templateId)
				// 	generatedItem = generateWeapon(template)
				// }
				// if (entry.templateType === 'armor') template = await ArmorTemplate.findByPk(entry.templateId)
				// if (entry.templateType === 'quest') template = await WeaponTemplate.findByPk(entry.templateId)
				// if (entry.templateType === 'treasure') template = await WeaponTemplate.findByPk(entry.templateId)
				// if (entry.templateType === 'food') template = await WeaponTemplate.findByPk(entry.templateId)
				// if (entry.templateType === 'consumable') template = await WeaponTemplate.findByPk(entry.templateId)
				// const template = await itemTemplate.findByPk(entry.itemTemplateId)
				generatedLoot.push(lootDrop)
			}
		}
		if (generatedLoot.length === 0) {
			console.log(`No loot was generated`)
		}
		return generatedLoot
	} catch (error) {
		console.log(`Error: `, error)
	}
}
