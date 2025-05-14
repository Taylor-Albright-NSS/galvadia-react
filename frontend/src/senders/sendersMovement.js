export const playerRoomTransitionSend = async (socket, player, futureX, futureY) => {
    socket.send(JSON.stringify({type: "playerAction", action: "playerRoomTransition", player, futureX, futureY}))
}

export const areaGetByCoordinates = (ws, coords) => {
    ws.send(JSON.stringify({ type: "areaAction", action: "anticipatedArea", coords }))
}