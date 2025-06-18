import { playerGainsExperience } from '../controllers/playerController.js'

export const playerGainsExperienceService = async (data, ws) => {
	const updatedPlayer = await playerGainsExperience(data)
	ws.send(JSON.stringify({ type: 'playerModify', action: 'playerGainsExperience', updatedPlayer }))
}
