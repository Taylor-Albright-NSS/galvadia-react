export const playerRoomTransitionSend = async (socket, player, combinedCoords) => {
    socket.send(JSON.stringify({type: "playerAction", action: "playerRoomTransition", player, combinedCoords}))
}