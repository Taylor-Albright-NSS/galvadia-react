export const playerRegularAttackSend = (playerId, enemyId, ws) => {
	ws.send(JSON.stringify({ type: "playerAction", action: "playerRegularAttack", playerId, enemyId }))
}