import { createQuestItem } from '../_xservices/servicesItem.js'
import { Npc } from '../models/npc.js'
import { PlayerArea } from '../models/playerArea.js'
import { PlayerNpc } from '../models/playerNpc.js'
import { enabledDirStr, enableDirection, lockDirType } from './npcUtils.js'

// export const keywordMapper = {
//     tutorialWall: () => tutorialWall()
// }

export const tutorialWall = async (playerId, areaId, keyword, command1) => {
	try {
		const egbert = await Npc.findOne({ where: { name: 'Egbert' } })
		if (!egbert) {
			throw new Error(`Egbert not found`)
		}
		const playerNpc = await PlayerNpc.findOne({
			where: {
				playerId,
				npcId: egbert.id,
			},
		})
		if (!playerNpc) {
			throw new Error(`PlayerNpc not found`)
		}
		await playerNpc.update({
			// area_id: 3,
			eventStage: 3,
			dialogueStage: 3,
		})
		const payload = {
			// npc: egbert,
			eventText: keyword.activateDescription,
			// npcText: 'strides to the south',
		}
		return payload
	} catch (error) {
		console.error(error)
		throw error
	}
}
export const tutorialLever = async (playerId, areaId, keyword, command1, ws) => {
	try {
		let payload
		if (command1 === 'pull') {
			console.log('f')
			const egbert = await Npc.findOne({ where: { name: 'Egbert' } })
			if (!egbert) {
				throw new Error(`Egbert not found`)
			}
			console.log('e')
			const playerNpc = await PlayerNpc.findOne({
				where: {
					playerId,
					npcId: egbert.id,
				},
			})
			console.log('d')
			if (!playerNpc) {
				throw new Error(`PlayerNpc not found`)
			}
			console.log('c')
			await playerNpc.update({
				area_id: 4,
				eventStage: 5,
				dialogueStage: 5,
			})
			await playerNpc.save()
			console.log('b')
			payload = {
				npc: egbert,
				eventText: keyword.activateDescription,
				npcDialogue: `You really pulled that lever! I'd hate to see what you could do with... Oh, nevermind. Let's move on.`,
				npcText: `strides to the east`,
			}
			console.log('a')
			// await PlayerArea.create({
			// 	playerId,
			// 	area_id: areaId,
			// 	unlockedDirections: { east: true },
			// })
			await enableDirection({ playerId, areaId, lockType: lockDirType.unlocked, direction: enabledDirStr.east, ws })
			console.log(0)
			// applyPlayerArea(playerArea, mainArea)
		} else if (command1 === 'examine') {
			payload = { eventText: keyword.description }
		}
		return payload
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const tutorialGlasses = async (playerId, keyword, ws) => {
	try {
		const questItem = await createQuestItem(playerId, 'player', 'Pair Of Glasses')
		console.log('Pair Of Glasses created')
		const payload = {
			eventText: keyword.activateDescription,
		}
		console.log(questItem, ' QUEST ITEM')
		console.log('Quest item should be sent')
		ws.send(JSON.stringify({ type: 'itemAction', action: 'itemToPlayer', questItem }))
		return payload
	} catch (error) {
		console.error(error)
		throw error
	}
}
