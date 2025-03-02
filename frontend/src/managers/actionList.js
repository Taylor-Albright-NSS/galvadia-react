import { moveDirection } from "./playerMovement"
import { playerExamine, playerGet, playerLook, playerPull, playerSpeakToNpc, playerSpeakToNpcQuest } from "../playerActions/playerActions"
import { playerInventoryDisplay } from "./playerInventoryDisplay";
import { toggleStatusFalse, toggleStatusTrue } from "../playerStatus/playerStatus";

const movementDirections = new Set(["north", "northeast", "east", "southeast" , "south", "southwest", "west", "northwest"])

export const commandActions = {
    // commandObject properties = 
    // { command1, command2, command3, command4, player, 
    //   setPlayer, addLog, currentArea, npcs, enemies
    //   items, setItems, playerItems, setPlayerItems,
    //   players, setPlayers, setNpcs, setEnemies, socket,
    //   playerStatus
    // }
    look: async ({ addLog, player, setCurrentArea, setNpcs, setEnemies, setItems, setPlayers}) => {
        playerLook(addLog, player, setCurrentArea, setNpcs, setEnemies, setItems, setPlayers)
    },
    speak: async ({npcs, command2, addLog, player}) => {playerSpeakToNpc(npcs, command2, addLog, player)},
    quest: async ({npcs, command2, addLog, player, playerStatus}) => {playerSpeakToNpcQuest(npcs, command2, addLog, player, playerStatus)},
    examine: async ({ command2, currentArea, addLog }) => {playerExamine(command2, currentArea, addLog)},
    pull: async ({ command2, currentArea, setCurrentArea, addLog }) => {playerPull(command2, currentArea, setCurrentArea, addLog)},
    get: async ({ command2, currentArea, setItems, player, addLog, setPlayerItems }) => {playerGet(command2, currentArea, setItems, player, addLog, setPlayerItems)},
    inventory: async ({ playerItems, addLog }) => {playerInventoryDisplay(playerItems, addLog)}
};

movementDirections.forEach(direction => {
    commandActions[direction] = ({ player, setPlayer, command1, currentArea, addLog, socket, playerStatus }) =>
        moveDirection(player, setPlayer, command1, currentArea, addLog, socket, playerStatus);
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