import { enemySpawns } from '../controllers/enemyController.js'

export const enemySpawnsService = async (data, ws, wss) => {
	console.log(data, ' DATA 2')
	await enemySpawns(data, ws, wss)
}
