export const playerRegularAttackSender = (playerId, enemyId, ws) => {
	ws.send(JSON.stringify({ type: "playerAction", action: "playerRegularAttack", playerId, enemyId }))
}

export const playerAdvancesEnemySender = (playerId, enemyId, ws) => {
	ws.send(JSON.stringify({ type: "playerAction", action: "playerAdvancesEnemy", playerId, enemyId }))
}

export const playerRetreatsSender = (playerId, areaId, ws) => {
	ws.send(JSON.stringify({ type: "playerAction", action: "playerRetreats", playerId, areaId }))
}

export const playerLooksSender = (playerId, areaId, ws) => {
	ws.send(JSON.stringify({ type: "playerAction", action: "playerLooks", playerId, areaId }))
}

export const playerSpeaksToNpcSender = (playerId, npcId, ws) => {
	ws.send(JSON.stringify({ type: "playerAction", action: "playerSpeaksToNpc", playerId, npcId }))
}