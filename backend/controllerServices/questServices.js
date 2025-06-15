import Item from '../models/item.js'
import { Npc } from '../models/npc.js'
import NpcQuest from '../models/npcQuest.js'
import Player from '../models/player.js'
import { PlayerNpc } from '../models/playerNpc.js'
import { executeQuestEvent } from '../utils/questUtils.js'

export const questCompleteService = async (data, ws, wss) => {
	const { npcId, playerId, playerLevel, playerInventory, playerKillList } = data.payload
	try {
		console.log(playerId, ' playerId')
		console.log(npcId, ' npcId')
		console.log('questCompleteService hit')
		let playerNpc = await PlayerNpc.findOne({ where: { playerId, npcId } })
		//model NPC is Egbert for this quest
		const modelNpc = await Npc.findByPk(3)

		let playersRequiredItems

		if (!playerNpc) {
			console.log('playerNpc does not exist')

			if (modelNpc.behavior === 'event') {
				playerNpc = await PlayerNpc.create({ name: modelNpc.name, playerId: playerId, npcId: npcId, eventStage: 1 })
			} else {
				playerNpc = await PlayerNpc.create({ name: modelNpc.name, playerId: playerId, npcId: npcId })
			}
			// return res.status(404).json({message: "Player_Npc relationship not found"})
		}
		const quest = await NpcQuest.findOne({ where: { npcId: modelNpc.id, questStage: playerNpc.questStage } })
		console.log(npcId, ' npcId')
		console.log(playerNpc.questStage, ' playerNpc.questStage')
		if (!quest) {
			return ws.send(JSON.stringify({ type: 'quest', action: 'fail', payload: { message: 'quest does not exist' } }))
		}

		if (playerLevel < quest.requirements.requiredLevel) {
			return ws.send(JSON.stringify({ type: 'quest', action: 'fail', payload: { message: 'You do not meet the level requirements to complete this quest' } }))
		}
		if (quest?.requirements?.requiredItems) {
			console.log('quest does have requirements')
			const hasRequiredItem = quest.requirements.requiredItems.every(item => {
				return playerInventory.some(invItem => {
					return invItem.name === item
				})
			})
			console.log(hasRequiredItem, ' hasRequiredItem value')
			playersRequiredItems = quest.requirements.requiredItems.map(itemName => playerInventory.find(item => item.name == itemName)).filter(Boolean)
			if (!hasRequiredItem) {
				return ws.send(JSON.stringify({ type: 'quest', action: 'fail', payload: { message: 'You do not have the proper ITEM to complete this quest' } }))
			}
			if (!playersRequiredItems) {
				return ws.send(JSON.stringify({ type: 'quest', action: 'fail', payload: { message: 'You do not have all the required ITEMS to complete this quest' } }))
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
			throw new Error(`Player not found`)
		}

		player.gold += quest.rewards.gold || 0
		player.experience += quest.rewards.experience || 0
		player.skillPoints += quest.rewards.skillPoints || 0
		player.attributePoints += quest.rewards.attributePoints || 0
		playerNpc.questStage++
		console.log('activation should happen here')
		// questCompleteActivateSomething(playerNpc)

		await player.save()
		await playerNpc.save()

		ws.send(JSON.stringify({ type: 'quest', action: 'complete', payload: { player, quest, npc: modelNpc, completionDialogue: quest.completionDialogue } }))
		await executeQuestEvent({ playerId, questId: quest.id, playerNpc, ws })
	} catch (error) {
		console.error(`Error: `, error)
		return ws.send(JSON.stringify({ type: 'error', action: 'quest', message: error }))
	}
}
