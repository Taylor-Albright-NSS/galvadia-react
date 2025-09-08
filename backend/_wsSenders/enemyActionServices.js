import Enemy from '../models/enemy.js'
import EnemyType from '../models/enemyType.js'

export const senderEnemySpawns = async (data, ws, wss) => {
	const { areaId } = data
	const elemental = await EnemyType.findByPk(1)
	if (!elemental) throw new Error(`Enemy Type not found`)

	const level = Math.floor(Math.random() * (elemental.maxLevel - elemental.minLevel + 1)) + elemental.minLevel
	const enemyTypeId = elemental.id
	const health = elemental.baseHealth + level * 5
	const damage = elemental.baseDamage + level
	const experience = elemental.baseExperience * level
	const loot = []

	const enemy = await Enemy.create({
		name: 'Mudling',
		enemyTypeId,
		area_id: areaId,
		level,
		health,
		damage,
		experience,
		loot,
	})

	if (!enemy) throw new Error(`Error creating enemy`)

	ws.send(JSON.stringify({ type: 'enemyAction', action: 'enemySpawns', enemy }))
}

export const senderEnemyDies = async (enemy, ws, wss) => {
	if (!enemy) {
		ws.send(JSON.stringify({ type: 'error', message: 'Enemy was not found' }))
	}
	console.log(`Enemy ID of dead enemy: ${enemy.id} `)
	await enemy.destroy()
	ws.send(JSON.stringify({ type: 'enemyAction', action: 'enemyDies', enemy, message: `${enemy.name} has been slain!` }))
}

export const senderEnemyTakesDamage = async (req, res) => {
	const { id } = req.params
	const { damage } = req.body
	const enemy = await Enemy.findOne({ where: { id: id } })
	enemy.health -= damage
	if (enemy.health <= 0) {
		console.log('Enemy DIES!')
		await senderEnemyDies(enemy, res)
		// return res.status(200).json(enemy)
	} else {
		console.log('Enemy not dead...')
		enemy.save()
		return ws.send(JSON.stringify({ type: 'enemyAction', action: 'enemyTakesDamage', enemy }))
	}
}
