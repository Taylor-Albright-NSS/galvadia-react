import { Keyword } from '../models/keyword.js'
import { Npc } from '../models/npc.js'
import Player from '../models/player.js'
import Area from '../models/area.js'

export const senderAnticipatedArea = async (data, ws) => {
	try {
		const { x, y } = data
		const area = await Area.findOne({
			where: { x, y },
			include: [{ model: Npc }, { model: Player }, { model: Keyword }],
		})
		if (!foundArea) {
			throw new Error(`Anticipated area not found`)
		}
		ws.send(JSON.stringify({ type: 'areaAction', action: 'anticipatedArea', area }))
	} catch (error) {
		console.error(`Error: `, error)
		ws.send(JSON.stringify({ type: 'error', message: error.message }))
	}
}
