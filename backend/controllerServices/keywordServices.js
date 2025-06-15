import { unlockDirection } from '../controllers/areaController.js'
import { postSpawnItemToPlayer } from '../controllers/itemController.js'
import Item from '../models/item.js'
import { Keyword } from '../models/keyword.js'
import { PlayerArea } from '../models/playerArea.js'
import { PlayerKeywordActivation } from '../models/playerKeywordActivation.js'
import { PlayerNpc } from '../models/playerNpc.js'
import { tutorialGlasses, tutorialLever, tutorialWall } from '../utils/keywordUtils.js'
import { createQuestItem } from './itemServices.js'

export const keywordExamineService = async (data, ws, wss) => {
	try {
		const { playerId, keywordId, areaId, command1 } = data
		const keyword = await Keyword.findByPk(keywordId)
		const playerKeyword = await PlayerKeywordActivation.findOne({ where: { playerId, keywordId } })

		if (!keyword) {
			throw new Error(`Keyword not found`)
		}

		if (command1 === 'examine' && keyword.actionVerb === 'examine') {
			console.log(`Examine keyword and examine to activate`)
			console.log(playerKeyword, ' playerKeyword')
			if (!playerKeyword) {
				console.log(`playerKeyword does not exist`)
				const newPlayerKeyword = await PlayerKeywordActivation.create({ playerId, keywordId, activated: true, requiredItemName: keyword?.special?.name })
				console.log(newPlayerKeyword, ' newly activated keyword')

				const payload = await executeKeywordEffect(keyword, { playerId, areaId, keywordId, command1 }, ws)
				if (!payload) {
					throw new Error(`Payload was not created`)
				}
				return ws.send(JSON.stringify({ type: 'keyword', action: 'activateSuccess', payload }))
			} else {
				console.log(`Keyword that activates with 'examine' has already been examined. Send alreadyActivatedDescription.`)
				const payload = {
					eventText: keyword.alreadyActivatedDescription,
				}
				return ws.send(JSON.stringify({ type: 'keyword', action: 'activateSuccess', payload }))
			}
		}

		if (command1 === 'examine') {
			console.log(`Examine success`)
			const payload = {
				description: keyword.description,
			}
			return ws.send(JSON.stringify({ type: 'keyword', action: 'examine', payload }))
		}

		if (keyword.actionVerb !== command1) {
			console.log(`Did not perform the correct action to activate the keyword`)
			return
		}
	} catch (error) {
		console.error(`Error: `, error)
		return ws.send(JSON.stringify({ type: 'error', message: error.message }))
	}
}

export const keywordActivationService = async (data, ws, wss) => {
	try {
		const { playerId, keywordId, areaId, command1 } = data
		const keyword = await Keyword.findByPk(keywordId)
		const playerKeyword = await PlayerKeywordActivation.findOne({ where: { playerId, keywordId } })

		if (!keyword) {
			throw new Error(`Keyword not found`)
		}
		if (command1 !== keyword.actionVerb) {
			console.log(`command1 !== keyword.actionVerb. Action failed.`)
			const payload = {
				description: `You cannot ${command1} the ${keyword.name}`,
			}
			return ws.send(JSON.stringify({ type: 'keyword', action: 'examine', payload }))
		}
		if (!playerKeyword) {
			console.log('playerKeyword does not exist. Creating new one and activating the keyword.')
			const newPlayerKeyword = await PlayerKeywordActivation.create({ playerId, keywordId, activated: true, requiredItemName: keyword?.special?.name })
			console.log(newPlayerKeyword, ' Keyword that requires "examine" command to activate has been activated via the "examine" command')

			const payload = await executeKeywordEffect(keyword, { playerId, areaId, keywordId, command1 }, ws)

			return ws.send(JSON.stringify({ type: 'keyword', action: 'activateSuccess', payload }))
		} else {
			console.log('keyword is already activated. Display already activated description.')
			const payload = {
				description: keyword.alreadyActivatedDescription,
			}
			return ws.send(JSON.stringify({ type: 'keyword', action: 'examine', payload }))
		}
	} catch (error) {
		console.error(`Error: `, error)
		return ws.send(JSON.stringify({ type: 'error', message: error.message }))
	}
}

export const readSignService = (data, ws, wss) => {
	try {
		const { playerId, keywordId, areaId, command1 } = data
		const sign = Keyword.findByPk(keywordId)
		if (!sign) {
			throw new Error(`Sign not found`)
		}
		const payload = {
			description: sign.description,
		}
		ws.send(JSON.stringify({ type: 'keyword', action: 'readSign', payload }))
	} catch (error) {
		console.error(error)
		ws.send(JSON.stringify({ type: 'error', message: error.message }))
	}
}

export const executeKeywordEffect = async (keyword, { playerId, areaId, keywordId, npcId, command1 }, ws) => {
	try {
		console.log('keyword activation action')
		let payload
		if (keyword.methodCode === METHOD_CODES.TUTORIAL_WALL) {
			payload = await tutorialWall(playerId, areaId, keyword, command1)
		}
		console.log('just before tutorial lever activation')
		if (keyword.methodCode === METHOD_CODES.TUTORIAL_LEVER) {
			console.log('tutorial lever has been pulled')
			payload = await tutorialLever(playerId, areaId, keyword, command1, ws)
		}
		if (keyword.methodCode === METHOD_CODES.TUTORIAL_PARCHMENT) {
			payload = await tutorialGlasses(playerId, keyword, ws)
		}
		return payload
	} catch (error) {
		throw error
	}
}

const METHOD_CODES = {
	TUTORIAL_WALL: 'tutorialWall',
	TUTORIAL_LEVER: 'tutorialLever',
	TUTORIAL_PARCHMENT: 'tutorialParchment',
}
