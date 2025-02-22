import { areaDisplay } from "./areaDisplay"
import { getAreaByCoords, fetchCurrentArea } from "./areas"
import { playerUpdateCoordinates } from "./playerUpdateCoordinates"

export const moveDirection = async (player, setPlayer, inputDirection, currentArea, addLog) => {
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
    const newPlayerCoords = await playerUpdateCoordinates(player, combinedCoords)
    if (!newPlayerCoords) {
        addLog("Cannot move in that direction (AREA DOES NOT EXIST)")
        return
    }
    setPlayer(prevState => ({...prevState, area_id: combinedCoords.area_id, x: newPlayerCoords.x, y:newPlayerCoords.y}))
}