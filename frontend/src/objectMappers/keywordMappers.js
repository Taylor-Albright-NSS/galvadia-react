export const keywordMapper = {
    tutorialWall: (playerId, keywordId, areaId, ws) => {
        ws.send(JSON.stringify({ type: 'keyword', action: 'activation', playerId, keywordId, areaId }))
    },
    tutorialLever: (playerId, keywordId, areaId, ws) => {
        ws.send(JSON.stringify({ type:'keyword', action: 'activation', playerId, keywordId, areaId }))
    },
    tutorialParchment: (playerId, keywordId, areaId, ws) => {
        ws.send(JSON.stringify({ type:'keyword', action: 'activation', playerId, keywordId, areaId }))
    }
}