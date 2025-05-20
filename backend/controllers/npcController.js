import { npcDTO } from '../models/dtos/npcDTO.js'
import Item from '../models/item.js'
import { Npc } from '../models/npc.js'
import { NpcDialogue } from '../models/npcDialogue.js'
import NpcQuest from '../models/npcQuest.js'
import Player from '../models/player.js'
import { PlayerNpc } from '../models/playerNpc.js'
import { questCompleteActivateSomething } from '../utils/questUtils.js'

//--------MULTIPLE NPCS
export const getEveryNpc = async (req, res) => {
	//Mainly for testing. Gets all Npc instances
	try {
		const npcs = await Npc.findAll()
		// const npcsDTO = npcs.map(npcDTO)
		res.status(200).json(npcs)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
export const getCurrentAreaNpcs = async (req, res) => {
	try {
		const { areaId, playerId } = req.params
		// console.log(areaId, " get current area npcs -> area id")
		const playerNpcs = await PlayerNpc.findAll({ where: { area_id: areaId, playerId: playerId } })
		const allNpcs = await Npc.findAll({ where: { area_id: areaId } })
		//filters npcs that the player has not yet interacted with
		const missingNpcs = allNpcs.filter(npc => !playerNpcs.some(playerNpc => playerNpc.npcId === npc.id))
		const newPlayerNpcs = await Promise.all(
			missingNpcs.map(npc => {
				PlayerNpc.create({
					playerId: playerId,
					npcId: npc.id,
					area_id: areaId,
					// dialogueStage: npc.dialogueStage,
					// dialogueIndex: npc.dialogueIndex,
					// questStage: npc.questStage,
				})
			})
		)

		const updatedPlayerNpcs = await PlayerNpc.findAll({
			where: { area_id: areaId, playerId },
			include: [{ model: Npc }], // Include master NPC reference for name, etc.
		})
		return res.status(200).json(updatedPlayerNpcs)
		// const npcsDTO = allNpcs.map(npcDTO)
		// res.status(200).json(npcsDTO)
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}
//--------SINGLE NPCS
export const getNpcById = async (req, res) => {
	const { id } = req.params
	const npc = await Npc.findOne({ where: { id: id } })
	res.json(npc)
}

export const getNpcQuestDialogue = async (req, res) => {
	const { npcId } = req.params
	const { playerId } = req.query
	const playerNpc = await PlayerNpc.findOne({
		where: {
			playerId: playerId,
			npcId: npcId,
		},
	})

	//If the player_npc relationship does not exist, create one and reassign its value to playerNpc
	if (!playerNpc && npcId > 0 && playerId > 0) {
		playerNpc = await PlayerNpc.create({ playerId: playerId, npcId: npcId })
	}
	if (!playerNpc && (isNaN(npcId) || isNaN(playerId))) {
		return res.status(404).json({ message: 'PlayerNpc not found' })
	}
	const npcDialogue = await NpcQuest.findOne({
		where: {
			npcId: parseInt(npcId),
			questStage: playerNpc.questStage,
		},
	})
	if (!npcDialogue) {
		return res.status(404).json({ success: false })
	}
	const dialogueArray = npcDialogue.dialogue
	await playerNpc.save()
	return res.status(200).json({ success: true, message: dialogueArray })
}

export const getNpcDialogue = async (req, res) => {
	const { npcId } = req.params
	const { playerId } = req.query
	let playerNpc = await PlayerNpc.findOne({
		where: {
			playerId: playerId,
			npcId: npcId,
		},
	})

	//If the player_npc relationship does not exist, create one and reassign its value to playerNpc
	if (!playerNpc && npcId > 0 && playerId > 0) {
		playerNpc = await PlayerNpc.create({ playerId: playerId, npcId: npcId })
	}
	if (!playerNpc && (isNaN(npcId) || isNaN(playerId))) {
		return res.status(404).json({ message: 'PlayerNpc not found' })
	}

	const npcDialogue = await NpcDialogue.findOne({
		where: {
			npcId: npcId,
			dialogueStage: playerNpc.dialogueStage,
		},
	})
	if (!npcDialogue) {
		return res.status(404).json({ message: 'dialogue not found', success: false })
	}
	const dialogueArray = npcDialogue.dialogue
	const dialogueIndex = playerNpc.dialogueIndex % dialogueArray.length
	const chosenDialogue = dialogueArray[dialogueIndex]
	playerNpc.dialogueIndex = (dialogueIndex + 1) % dialogueArray.length
	await playerNpc.save()
	res.status(200).json(chosenDialogue)
}

export const getNpcDialogueAll = async (req, res) => {
	const npcDialogue = await NpcDialogue.findAll()
	console.log(npcDialogue)
	res.status(200).json(npcDialogue)
}
//--------GETS ENTIRE QUEST - TESTING ONLY
export const getNpcQuest = async (req, res) => {
	const { npcId, playerId } = req.params
	const playerNpc = await PlayerNpc.findOne({ where: { playerId: playerId, npcId: npcId } })
	if (!playerNpc) {
		return res.status(404).json({ message: 'Player not found' })
	}
	const quest = await NpcQuest.findOne({ where: { npcId, questStage: playerNpc.questStage } })
	if (!quest) {
		return res.status(404).json({ message: 'Quest not found' })
	}
	return res.status(200).json(quest)
}

export const postNpcRequirements = async (req, res) => {
	const { npcId, playerId, playerLevel, playerInventory, playerKillList } = req.body
	let playerNpc = await PlayerNpc.findOne({ where: { playerId: playerId, npcId: npcId } })

	// if (!playerNpc && (npcId > 0 && playerId > 0)) {
	//   playerNpc = await PlayerNpc.create({playerId: playerId, npcId: npcId})
	// }
	// if (!playerNpc && (isNaN(npcId) || isNaN(playerId))) {
	//   return res.status(404).json({message: "PlayerNpc not found"})
	// }

	let playersRequiredItems
	if (!playerNpc) {
		playerNpc = await PlayerNpc.create({ playerId: playerId, npcId: npcId })
		// return res.status(404).json({message: "Player_Npc relationship not found"})
	}
	const quest = await NpcQuest.findOne({ where: { npcId, questStage: playerNpc.questStage } })
	if (!quest) {
		return res.status(404).json({ message: '404' })
	}

	if (playerLevel < quest.requirements.requiredLevel) {
		return res.status(400).json({ message: 'level' })
	}

	if (quest.requirements.requiredItems) {
		const hasRequiredItem = quest.requirements.requiredItems.every(item => playerInventory.some(invItem => invItem.name.includes(item)))
		playersRequiredItems = quest.requirements.requiredItems.map(itemName => playerInventory.find(item => item.name == itemName)).filter(Boolean)
		if (!hasRequiredItem) {
			return res.status(400).json({ message: 'item' })
		}
		if (!playersRequiredItems) {
			return res.status(400).json({ message: 'required items not met' })
		}
		await Promise.all(
			playersRequiredItems.map(async item => {
				const itemToDestroy = await Item.findOne({ where: { id: item.id } })
				if (itemToDestroy) {
					await itemToDestroy.destroy()
				}
			})
		)
	}
	const player = await Player.findByPk(playerId)
	if (!player) {
		return res.status(404).json({ message: 'Player not found' })
	}

	player.gold += quest.rewards.gold || 0
	player.experience += quest.rewards.experience || 0
	player.skillPoints += quest.rewards.skillPoints || 0
	player.attributePoints += quest.rewards.attributePoints || 0
	playerNpc.questStage++
	console.log('activation should happen here')
	questCompleteActivateSomething(playerNpc)

	await player.save()
	await playerNpc.save()

	return res.status(200).json({ player, completionDialogue: quest.completionDialogue })
}

export const patchDecrementQuestStage = async (req, res) => {
	const { npcId, playerId } = req.params
	const playerNpc = await PlayerNpc.findOne({ where: { npcId, playerId } })
	if (!playerNpc) {
		return res.status(404).json({ message: 'Player/Npc relationship not found' })
	}
	playerNpc.questStage = Math.max(1, playerNpc.questStage - 1)
	playerNpc.save()
	return res.status(200).json({ message: `quest stage decremented to ${playerNpc.questStage}` })
}
export const patchIncrementQuestStage = async (req, res) => {
	const { npcId, playerId } = req.params
	const playerNpc = await PlayerNpc.findOne({ where: { npcId, playerId } })
	if (!playerNpc) {
		return res.status(404).json({ message: 'Player/Npc relationship not found' })
	}
	playerNpc.questStage = playerNpc.questStage + 1
	playerNpc.save()
	return res.status(200).json({ message: `quest stage incremented to ${playerNpc.questStage}` })
}
