import {
	playerAdvancesEnemyService,
	playerEquipsArmorService,
	playerLooksService,
	playerPacksItemService,
	playerPicksUpItemService,
	playerRegularAttackService,
	playerRemovesArmorService,
	playerRetreatsService,
	playerRoomTransitionService,
	playerSpeaksToNpcService,
	playerUnpacksItemService,
} from '../_wsSenders/playerActionsServices.js'
import { playerGainsExperienceService } from '../_wsSenders/playerModifyServices.js'

//prettier-ignore
export const handlePlayerAction = (data, ws, wss) => {
	if (data.action === 'playerRoomTransition') {playerRoomTransitionService(data, ws, wss)}
    if (data.action === 'playerRegularAttack') {playerRegularAttackService(data, ws, wss)}
    if (data.action === 'playerAdvancesEnemy') {playerAdvancesEnemyService(data, ws, wss)}
    if (data.action === 'playerRetreats') {playerRetreatsService(data, ws, wss)}
    if (data.action === 'playerLooks') {playerLooksService(data, ws, wss)}
    if (data.action === 'playerSpeaksToNpc') {playerSpeaksToNpcService(data, ws, wss)}
    if (data.action === 'playerEquipsArmor') {playerEquipsArmorService(data, ws, wss)}
    if (data.action === 'playerRemovesArmor') {playerRemovesArmorService(data, ws, wss)}
    if (data.action === 'playerPacksItem') {playerPacksItemService(data, ws, wss)}
    if (data.action === 'playerUnpacksItem') {playerUnpacksItemService(data, ws, wss)}
    if (data.action === 'playerPicksUpItem') {playerPicksUpItemService(data, ws, wss)}
}

export const handlePlayerModify = (data, ws, wss) => {
	if (data.action === 'playerGainsExperience') {
		playerGainsExperienceService(data, ws)
	}
}
