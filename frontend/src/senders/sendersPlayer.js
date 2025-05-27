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

export const playerEquipsArmorSender = (playerId, itemId, ws) => {
	ws.send(JSON.stringify({ type: "playerAction", action: "playerEquipsArmor", playerId, itemId }))
}

export const playerRemovesArmorSender = (playerId, itemId, ws) => {
	ws.send(JSON.stringify({ type: "playerAction", action: "playerRemovesArmor", playerId, itemId }))
}

export const playerPacksItemSender = (playerId, itemId, itemLocation, ws) => {
	ws.send(JSON.stringify({ type: "playerAction", action: "playerPacksItem", playerId, itemId, itemLocation }))
}
export const playerUnpacksItemSender = (playerId, itemId, itemLocation, ws) => {
	ws.send(JSON.stringify({ type: "playerAction", action: "playerUnpacksItem", playerId, itemId, itemLocation }))
}

export const playerPicksUpItemSender = (playerId, itemId, areaId, command2, ws) => {
	ws.send(JSON.stringify({ type: 'playerAction', action: 'playerPicksUpItem', playerId, itemId, areaId, command2 }))
}

// export const currentAreaItemsSender = async (playerId, areaId, ws) => {
//     console.log(playerId, " playerId")
//     console.log(areaId, " areaId")
//     ws.send(JSON.stringify({ type: "itemAction", action: "currentAreaItems", playerId, areaId }))
// }