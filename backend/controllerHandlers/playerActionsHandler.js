import { playerAdvancesEnemyService, playerRegularAttackService, playerRetreatsService, playerRoomTransitionService } from '../controllerServices/playerActions.js'
import { playerGainsExperienceService } from '../controllerServices/playerModify.js'

//prettier-ignore
export const handlePlayerAction = (data, ws, wss) => {
	if (data.action === 'playerRoomTransition') {playerRoomTransitionService(data, ws, wss)}
    if (data.action === 'playerRegularAttack') {playerRegularAttackService(data, ws, wss)}
    if (data.action === 'playerAdvancesEnemy') {playerAdvancesEnemyService(data, ws, wss)}
    if (data.action === 'playerRetreats') {playerRetreatsService(data, ws, wss)}
}

export const handlePlayerModify = (data, ws, wss) => {
	if (data.action === 'playerGainsExperience') {
		playerGainsExperienceService(data)
	}
}
