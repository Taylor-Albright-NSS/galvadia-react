import { fetchNpcDialogue } from "../fetches/npcs/npcs"
import { fetchCurrentArea } from "../managers/areas"
import { areaDisplay } from "../managers/areaDisplay"
import { npcSpeaks } from "./npcActions"
import { fetchAllItemsThatBelongToPlayer, fetchCurrentAreaItems, fetchCurrentAreaItemsToPlayer } from "../fetches/items/items"

export const playerSpeakToNpc = async (npcs, command2, addLog) => {
    if (!command2) {
        if (npcs.length === 0) {
            addLog("There is nobody in the room to speak with")
            return
        }
        if (npcs.length > 1) {
            addLog("You must specify who you want to speak with")
            return
        }
        if (npcs.length === 1) {
            const npcDialogue = await fetchNpcDialogue(npcs[0])
            addLog(npcDialogue)
            return
        }
        return
    }
    if (command2) {
        const npc = npcs.find(npc => npc.name.toLowerCase() === command2)
        const npcDialogue = await fetchNpcDialogue(npc)
        const dialogueJSX = npcSpeaks(npc, npcDialogue.dialogue[0])
        addLog(dialogueJSX)
        return
    }
}

export const playerLook = async (addLog, currentArea, enemies, npcs, items) => {
    // const playerCurrentArea = await fetchCurrentArea(player.area_id);
    addLog(areaDisplay(currentArea, enemies, npcs, items));
}

export const playerExamine = async (command2, currentArea, addLog) => {
    if (!command2) {
        addLog("You must specify what you want to examine")
        return
    }
    const foundItem = currentArea.Keywords.find(keyword => keyword.refName == command2)
    if (foundItem) {
        addLog(foundItem.description)
        return
    }
    if (!foundItem) {
        addLog(`You do not see a ${command2} to examine`)
        return
    }
}

export const playerPull = async (command2, currentArea, setCurrentArea, addLog) => {
    if (!command2) {
        addLog("You must specify what you want to pull")
        return
    }
    const foundKeyword = currentArea.Keywords.find(keyword => keyword.refName == command2)
    if (foundKeyword) {
        addLog(`You pull the ${foundKeyword.refName}`)
        const response = await foundKeyword[foundKeyword.methodCode](currentArea, foundKeyword)
        await setCurrentArea(prev => ({...prev, exitsBool: response.updatedArea.exitsBool}))
    }
    if (!foundKeyword) {
        addLog(`You do not see a ${command2} to pull`)
        return
    }
}

export const playerGet = async (command2, currentArea, setItems, player, addLog, setPlayerItems) => {
    if (command2 != "all") {
        addLog("Please specify all")
        return
    }
    if (command2 === "all") {
        const currentAreaItems = await fetchCurrentAreaItems(currentArea.id)
        await fetchCurrentAreaItemsToPlayer(currentAreaItems, player.id)
        setItems(prev => prev.filter(item => item.ownerId != player.id && item.ownerType != "player"))
        const updatedPlayerInventory = await fetchAllItemsThatBelongToPlayer(player.id)
        setPlayerItems(updatedPlayerInventory)
        addLog(`You pick up all the items in the room`)
    }
}
