export const enemySpawnsSender = (areaId, ws) => {
	ws.send(JSON.stringify({ type: 'enemyAction', action: 'enemySpawns', areaId }))
}
export const senderEnemyTakesDamage = (damage, enemyId, ws) => {
	ws.send(JSON.stringify({ type: 'enemyAction', action: 'enemyTakesDamage' }))
}
