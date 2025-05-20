//EXAMPLE OF SENDER
// export const itemSender = (itemId, enemyId, ws) => {
// 	ws.send(JSON.stringify({ type: "playerAction", action: "playerRegularAttack", itemId, enemyId }))
// }

export const currentAreaItemsSender = async (playerId, areaId, ws) => {
    console.log(playerId, " playerId")
    console.log(areaId, " areaId")
    ws.send(JSON.stringify({ type: "itemAction", action: "currentAreaItems", playerId, areaId }))
}