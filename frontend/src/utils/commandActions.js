import { moveDirection } from "../playerActions/playerMovement"
import { playerAdvances, playerAttacks, playerDropsItem, playerExamineService, playerGet, playerInspectService, playerLookService, playerOffersQuest, 
            playerPacksItem, playerPull, playerRetreats, playerSpeakToNpc, playerSpeakToNpcQuest, 
            playerUnpacksItem 
        } from "../services/servicesPlayer"

import { playerInventoryDisplay } from "../DOMrenders/playerInventoryDisplay";

export const commandActions = {
// command1, command2, command3, command4, player, setPlayer, addLog, currentArea, npcs, enemies
// items, setItems, playerItems, setPlayerItems, players, setPlayers, setNpcs, setEnemies, ws,
// playerStatus
    look: async (commandObject) => {playerLookService(commandObject)},
    speak: async (commandObject) => {playerSpeakToNpc(commandObject)},
    quest: async (commandObject) => {playerSpeakToNpcQuest(commandObject)},
    examine: async (commandObject) => {playerExamineService(commandObject)},
    inspect: async (commandObject) => {playerInspectService(commandObject)},
    pull: async (commandObject) => {playerPull(commandObject)},
    get: async (commandObject) => {playerGet(commandObject)},
    inventory: async (commandObject) => {playerInventoryDisplay(commandObject)},
    offer: async (commandObject) => {playerOffersQuest(commandObject)},
    unpack: async (commandObject) => {playerUnpacksItem(commandObject)},
    pack: async (commandObject) => {playerPacksItem(commandObject)},
    drop: async (commandObject) => {playerDropsItem(commandObject)},
    attack: async (commandObject) => {playerAttacks(commandObject)},
    advance: async (commandObject) => {playerAdvances(commandObject)},
    retreat: async (commandObject) => {playerRetreats(commandObject)},
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
    commandActions[direction] = ({ gameData, setGameData, command1, addLog, ws, playerStatus }) =>
        moveDirection(gameData, setGameData, command1, addLog, ws, playerStatus);
});