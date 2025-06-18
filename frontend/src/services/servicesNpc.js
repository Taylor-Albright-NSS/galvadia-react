export const npcSpeechEvent = (playerId, npcId, areaId, ws) => {
    ws.send(JSON.stringify({ type: 'playerAction', action: 'playerSpeaksToNpc', playerId, npcId, areaId }))
}

