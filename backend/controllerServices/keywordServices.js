import { unlockDirection } from '../controllers/areaController.js'
import { postSpawnItemToPlayer } from '../controllers/itemController.js'
import Item from '../models/item.js'
import { Keyword } from '../models/keyword.js'
import { PlayerArea } from '../models/playerArea.js'
import { PlayerKeywordActivation } from '../models/playerKeywordActivation.js'
import { PlayerNpc } from '../models/playerNpc.js'

export const keywordActivationService = async (data, ws, wss) => {
	try {
		const { playerId, keywordId, areaId } = data
		const keyword = await Keyword.findByPk(keywordId)
		if (!keyword) {
			throw new Error(`Keyword not found`)
		}
		let keywordActivation = await PlayerKeywordActivation.findOne({ where: { keywordId, playerId } })
		console.log(keywordActivation, 'Keyword Activateion')
		if (!keywordActivation && playerId && keywordId) {
			keywordActivation = await PlayerKeywordActivation.create({ playerId, keywordId, activated: true, requiredItemName: keyword?.special?.name })
			keywordActivationAction(keyword.methodCode, playerId, areaId, keywordId, ws)

			ws.send(JSON.stringify({ type: 'keyword', action: 'activateSuccess', activateDescription: keyword.activateDescription, message: 'Keyword has been activated' }))
		} else if (keywordActivation && keywordActivation.activated) {
			return ws.send(JSON.stringify({ type: 'keyword', action: 'activateFail', description: keyword.description, message: 'Already activated' }))
		}
		console.log(keywordActivation, ' keywordActivation')
	} catch (error) {
		console.error(`Error: `, error)
		return ws.send(JSON.stringify({ type: 'error', message: error.message }))
	}
}

export const keywordActivationAction = async (methodCode, playerId, area_id, keywordId, ws) => {
	console.log('keyword activation action')
	if (methodCode === 'tutorialWall') {
		await PlayerArea.create({
			playerId,
			area_id,
			unblockedDirections: { south: true },
		})
	}
	if (methodCode === 'tutorialLever') {
		await PlayerArea.create({
			playerId,
			area_id,
			unlockedDirections: { east: true },
		})
	}
	if (methodCode === 'tutorialParchment') {
		const name = 'Pair Of Glasses'
		const keywords = ['pair of glasses', 'pair', 'glasses']
		await postSpawnItemToPlayer(playerId, name, keywords, ws)
	}
}
