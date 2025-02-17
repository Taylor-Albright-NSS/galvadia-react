import { look } from "./displayFunctions"
import { moveDirection } from "./playerMovement"
import { areaDisplay } from "./areaDisplay"
import { getCurrentArea } from "./areas"


export const actionList = async (commandObject) => {
    const { command1, command2, command3, command4, player, setPlayer, addLog } = commandObject
    const movementDirections = new Set(["north", "northeast", "east", "southeast" , "south", "southwest", "west", "northwest"])
    const actionList = {
        look: async function() {
            const playerCurrentArea = await getCurrentArea(player.area_id)
            addLog(areaDisplay(playerCurrentArea))
        },
    }
    console.log(command1)
    movementDirections.forEach(direction => {
        actionList[direction] = () => moveDirection(player, setPlayer, command1, addLog);
    })

    // eslint-disable-next-line no-prototype-builtins
    if (!actionList.hasOwnProperty(command1)) {
        addLog("That is not a valid command")
        return
    }
    actionList[command1]()
}