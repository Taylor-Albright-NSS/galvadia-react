import { enemySpawnsService } from '../controllerServices/enemyActionServices.js'

export const handleEnemyAction = async (data, ws, wss) => {
	console.log(data, ' DATA')
	if (data.action === 'enemySpawns') {
		enemySpawnsService(data, ws, wss)
	}
}
