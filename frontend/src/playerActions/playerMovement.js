import { areaDisplay } from "../DOMrenders/areaDisplay"
import { getAreaByCoords } from "../fetches/areas/areas"
import { playerUpdateCoordinates } from "../fetches/players/playerUpdateCoordinates"
import { toggleStatusFalse } from "../utils/playerStatus"

export const moveDirection = async (player, setPlayer, inputDirection, currentArea, addLog, socket, playerStatus) => {
    toggleStatusFalse(playerStatus, "isTalking")
    if (currentArea.exitsBool[inputDirection] == "locked") {
        addLog("You cannot move in this direction. The door is locked.")
        return
    }
    if (currentArea.exitsBool[inputDirection] == "blocked") {
        addLog("The way forward is blocked.")
        return
    }
    const directionCoordsList = {
        north: { x: 0, y: 1},
        east: { x: 1, y: 0 },
        south: { x: 0, y: -1 },
        west: { x: -1, y: 0 },
    }
    const directionCoords = directionCoordsList[inputDirection]
    const combinedCoords = {
         x: player.x + directionCoords.x,
         y: player.y + directionCoords.y,
    }
    const newAreaIfExists = await getAreaByCoords(combinedCoords)
    if (!newAreaIfExists) {
        console.log("Does not exist")
        return
    }
    combinedCoords.area_id = newAreaIfExists.id
    combinedCoords.oldAreaId = player.area_id
    //send websocket before player's coordinates change so websocket will broadcast to all players
    //   in the room the the player is leaving
    socket.send(JSON.stringify({type: "playerMoves", playerId: player.id, areaId: player.area_id}))
    const newPlayerCoords = await playerUpdateCoordinates(player, combinedCoords)
    if (!newPlayerCoords) {
        addLog("Cannot move in that direction (AREA DOES NOT EXIST)")
        return
    }
    setPlayer(prevState => ({...prevState, area_id: combinedCoords.area_id, x: newPlayerCoords.x, y:newPlayerCoords.y}))
}