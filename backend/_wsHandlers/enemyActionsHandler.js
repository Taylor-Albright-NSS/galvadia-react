import { serviceEnemySpawns } from '../controllerServices/enemyActionServices.js'

export const handleEnemyAction = async (data, ws, wss) => {
	if (data.action === 'enemySpawns') {
		await serviceEnemySpawns(data, ws, wss)
	}
}
