import { PlayerArea } from '../models/playerArea.js'
import { enableDirection, npcMovementStrings, npcMovementVerbs } from './npcUtils.js'

export const questCompleteActivateSomething = playerNpc => {
	const { npcId, questStage, playerId, area_id } = playerNpc
	console.log(playerNpc)
	console.log(npcId, ' npcId')
	console.log(questStage, ' questStage')
	if (npcId === 3 && questStage === 2) {
		questUnblockDirection(playerId, 7)
	}
}

export const questUnblockDirection = async ({ playerId, areaId }) => {
	console.log('quest perform activation')
	const newPlayerArea = await PlayerArea.create({
		playerId,
		area_id: areaId,
		unblockedDirections: {
			east: true,
		},
	})
	await newPlayerArea.save()
}

export const executeQuestEvent = async ({ playerId, questId, playerNpc, ws }) => {
	try {
		console.log(playerId, 'playerId')
		console.log(questId, 'questId')
		if (questId === 1) return tutorialGlassesEvent({ playerId, playerNpc, ws })
	} catch (error) {
		throw error
	}
}

export const tutorialGlassesEvent = async ({ playerId, playerNpc, ws }) => {
	try {
		console.log('tutorialGlassEvent ran')
		playerNpc.update({
			area_id: 6,
			dialogueStage: 6,
			eventStage: 6,
		})
		const eventText = npcMovementVerbs.strides + ' ' + npcMovementStrings.east
		const payload = {
			npcId: playerNpc.npcId,
			npcName: 'Egbert',
			eventText,
		}
		console.log('just before enable direction')
		await enableDirection({ playerId, areaId: 4, lockType: 'unblockedDirections', direction: 'east', ws })
		console.log('just after enable direction')
		return ws.send(JSON.stringify({ type: 'npcEvent', action: 'npcMoves', payload }))
	} catch (error) {
		throw error
	}
}
