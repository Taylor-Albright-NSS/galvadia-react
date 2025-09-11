import { senderEnemySpawns, senderEnemyTakesDamage } from '../_wsSenders/enemyActionServices.js'

export const handleEnemyAction = async (data, ws, wss) => {
	if (data.action === 'enemySpawns') await senderEnemySpawns(data, ws, wss)
	if (data.action === 'enemyTakesDamage') await senderEnemyTakesDamage(data, ws, wss)
}
