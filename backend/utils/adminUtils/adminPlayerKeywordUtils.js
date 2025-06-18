import { PlayerKeywordActivation } from '../../models/playerKeywordActivation.js'

export const adminKeywordToggle = async (data, ws) => {
	if (data.action === 'PlayerKeywordActivation') {
		const { playerId, keywordId, toggle } = data
		if (!playerId || !keywordId) {
			ws.send(JSON.stringify({ type: 'error', message: 'Invalid data for keyword toggle' }))
			return
		}
		const playerKeyword = await PlayerKeywordActivation.findOne({ where: { keywordId } })
		await playerKeyword.update({
			activated: toggle,
		})
		await playerKeyword.save()

		console.log(`Toggling keyword '${playerKeyword}' for player ID ${playerId} to ${toggle}`)
		ws.send(JSON.stringify({ type: 'success', message: `Keyword '${playerKeyword}' toggled for player ID ${playerId}` }))
	} else {
		ws.send(JSON.stringify({ type: 'error', message: 'Unknown action for keyword toggle' }))
	}
}
