import { moveDirection } from "../playerActions/playerMovement"
import { playerDropsItem, playerExamine, playerGet, playerLook, playerOffersQuest, playerPacksItem, playerPull, playerSpeakToNpc, playerSpeakToNpcQuest, playerUnpacksItem } from "../playerActions/playerActions"
import { playerInventoryDisplay } from "../DOMrenders/playerInventoryDisplay";

export const commandActions = {
// command1, command2, command3, command4, player, setPlayer, addLog, currentArea, npcs, enemies
// items, setItems, playerItems, setPlayerItems, players, setPlayers, setNpcs, setEnemies, socket,
// playerStatus
    look: async (commandObject) => {playerLook(commandObject)},
    speak: async (commandObject) => {playerSpeakToNpc(commandObject)},
    quest: async (commandObject) => {playerSpeakToNpcQuest(commandObject)},
    examine: async (commandObject) => {playerExamine(commandObject)},
    pull: async (commandObject) => {playerPull(commandObject)},
    get: async (commandObject) => {playerGet(commandObject)},
    inventory: async (commandObject) => {playerInventoryDisplay(commandObject)},
    offer: async (commandObject) => {playerOffersQuest(commandObject)},
    unpack: async (commandObject) => {playerUnpacksItem(commandObject)},
    pack: async (commandObject) => {playerPacksItem(commandObject)},
    drop: async (commandObject) => {playerDropsItem(commandObject)}
};

export const actionList = async (commandObject) => {
    const { command1, addLog} = commandObject
    if (!commandActions[command1]) {
        addLog("That is not a valid command")
        return
    }
    //This is where the entire commandObject is passed to commandActions
    //It's also where the deconstructed objects below { player, setPlayer, command1, etc } are from
    commandActions[command1](commandObject)
}
const movementDirections = new Set(["north", "northeast", "east", "southeast" , "south", "southwest", "west", "northwest"])


movementDirections.forEach(direction => {
    commandActions[direction] = ({ gameData, setGameData, command1, addLog, socket, playerStatus }) =>
        moveDirection(gameData, setGameData, command1, addLog, socket, playerStatus);
    // commandActions[direction] = ({ player, setPlayer, command1, currentArea, addLog, socket, playerStatus }) =>
    //     moveDirection(player, setPlayer, command1, currentArea, addLog, socket, playerStatus);
});
//