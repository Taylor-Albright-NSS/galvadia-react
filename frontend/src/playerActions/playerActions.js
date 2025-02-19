import { fetchNpcDialogue } from "../fetches/npcs/npcs"
import { getCurrentArea } from "../managers/areas"
import { areaDisplay } from "../managers/areaDisplay"
import { npcSpeaks } from "./npcActions"

export const playerSpeakToNpc = async (npcs, command2, addLog) => {
    if (!command2) {
        if (npcs.length === 0) {
            console.log("There is nobody in the room to speak with")
            return
        }
        if (npcs.length > 1) {
            console.log("You must specify who you want to speak with")
            return
        }
        if (npcs.length === 1) {
            const npcDialogue = await fetchNpcDialogue(npcs[0])
            console.log(`Npc dialogue: ${npcDialogue[0]}`)
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

export const playerLook = async (player, addLog) => {
    const playerCurrentArea = await getCurrentArea(player.area_id);
    addLog(areaDisplay(playerCurrentArea));
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
        console.log(response)
    }
    if (!foundKeyword) {
        addLog(`You do not see a ${command2} to pull`)
        return
    }
}