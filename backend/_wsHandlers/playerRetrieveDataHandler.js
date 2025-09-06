import { playerUpdateAllAttributes } from '../utils/calculations/calculationsPlayer.js'

export const handlePlayerDataRetrieval = (data, ws) => {
	if (data.action === 'allAttributes') {
		playerUpdateAllAttributes(data, ws)
	}
}
