export const enemySpawnsSender = (areaId, ws) => {
	ws.send(JSON.stringify({ type: "enemyAction", action: "enemySpawns", areaId }))
}