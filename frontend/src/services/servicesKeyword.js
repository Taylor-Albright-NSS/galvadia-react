export const keywordActivationSender = (playerId, keywordId, areaId, command1, ws) => {
    console.log('keyword activate sender')
    ws.send(JSON.stringify({ type: 'keyword', action: 'activation', playerId, keywordId, areaId, command1 }))
}
export const keywordExamineSender = (playerId, keywordId, areaId, command1, ws) => {
    console.log('keyword activate sender')
    ws.send(JSON.stringify({ type: 'keyword', action: 'examine', playerId, keywordId, areaId, command1 }))
}