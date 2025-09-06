import Enemy from '../models/enemy.js'
import EnemyType from '../models/enemyType.js'

export const serviceEnemySpawns = async (data, ws, wss) => {
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
