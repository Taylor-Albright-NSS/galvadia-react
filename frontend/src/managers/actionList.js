import { moveDirection } from "./playerMovement"
import { playerExamine, playerGet, playerLook, playerPull, playerSpeakToNpc } from "../playerActions/playerActions"
import { playerInventoryDisplay } from "./playerInventoryDisplay";

const movementDirections = new Set(["north", "northeast", "east", "southeast" , "south", "southwest", "west", "northwest"])

export const commandActions = {
    // commandObject properties = 
    // { command1, command2, command3, command4, player, 
    //   setPlayer, addLog, currentArea, npcs, enemies
    //   items, setItems, playerItems, setPlayerItems
    // }
    look: async ({ addLog, currentArea, enemies, npcs, items}) => {
        playerLook(addLog, currentArea, enemies, npcs, items)
    },
    speak: async ({npcs, command2, addLog}) => {playerSpeakToNpc(npcs, command2, addLog)},
    examine: async ({ command2, currentArea, addLog }) => {playerExamine(command2, currentArea, addLog)},
    pull: async ({ command2, currentArea, setCurrentArea, addLog }) => {playerPull(command2, currentArea, setCurrentArea, addLog)},
    get: async ({ command2, currentArea, setItems, player, addLog, setPlayerItems }) => {playerGet(command2, currentArea, setItems, player, addLog, setPlayerItems)},
    inventory: async ({ playerItems, addLog }) => {playerInventoryDisplay(playerItems, addLog)}
};

movementDirections.forEach(direction => {
    commandActions[direction] = ({ player, setPlayer, command1, currentArea, addLog }) =>
        moveDirection(player, setPlayer, command1, currentArea, addLog);
});

export const actionList = async (commandObject) => {
    console.log(commandObject)
    const { command1, addLog} = commandObject
    if (!commandActions[command1]) {
        addLog("That is not a valid command")
        return
    }
    commandActions[command1](commandObject)
}