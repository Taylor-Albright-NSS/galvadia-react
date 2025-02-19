import { moveDirection } from "./playerMovement"
import { playerExamine, playerLook, playerPull, playerSpeakToNpc } from "../playerActions/playerActions"

const movementDirections = new Set(["north", "northeast", "east", "southeast" , "south", "southwest", "west", "northwest"])

export const commandActions = {
    // commandObject properties = 
    // { command1, command2, command3, command4, player, 
    //   setPlayer, addLog, currentArea, npcs, enemies
    // }
    look: async ({ player, addLog, getCurrentArea, areaDisplay}) => {playerLook(player, addLog, getCurrentArea, areaDisplay)},
    speak: async ({npcs, command2, addLog}) => {playerSpeakToNpc(npcs, command2, addLog)},
    examine: async ({ command2, currentArea, addLog }) => {playerExamine(command2, currentArea, addLog)},
    pull: async ({ command2, currentArea, setCurrentArea, addLog }) => {playerPull(command2, currentArea, setCurrentArea, addLog)},
};

movementDirections.forEach(direction => {
    commandActions[direction] = ({ player, setPlayer, command1, currentArea, addLog }) => 
        moveDirection(player, setPlayer, command1, currentArea, addLog);
});

export const actionList = async (commandObject) => {
    const { command1, addLog} = commandObject
    if (!commandActions[command1]) {
        addLog("That is not a valid command")
        return
    }
    commandActions[command1](commandObject)
}