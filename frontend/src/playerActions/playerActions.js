import { fetchCurrentAreaNpcs, fetchNpcDialogue, fetchNpcQuestDialogue } from "../fetches/npcs/npcs"
import { fetchCurrentArea } from "../fetches/areas/areas"
import { areaDisplay } from "../DOMrenders/areaDisplay"
import { npcSpeaks } from "../DOMrenders/npcActions"
import { fetchAllItemsThatBelongToPlayer, fetchCurrentAreaItems, fetchCurrentAreaItemsToPlayer } from "../fetches/items/items"
import { fetchEnemiesInRoom } from "../fetches/enemies/enemies"
import { fetchPlayersInRoom } from "../fetches/players/players"
import { toggleStatusFalse, toggleStatusTrue } from "../utils/playerStatus"

export const playerSpeakToNpc = async (commandObject) => {
    const { npcs, command2, addLog, player } = commandObject
    const playerId = player.id
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
            const npcId = npcs[0].id
            const npcDialogue = await fetchNpcDialogue(playerId, npcId)
            addLog(npcDialogue)
            return
        }
        return
    }
    if (command2) {
        const npc = npcs.find(npc => npc.name.toLowerCase() === command2)
        const npcId = npc.id
        const npcDialogue = await fetchNpcDialogue(playerId, npcId)
        const dialogueJSX = npcSpeaks(npc, npcDialogue)
        addLog(dialogueJSX)
        return
    }
}

const wait = async (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, milliseconds)
    })
}

export const playerSpeakToNpcQuest = async (commandObject) => {
    const { npcs, command2, addLog, player, playerStatus } = commandObject
    toggleStatusTrue(playerStatus, "isTalking")
    const playerId = player.id
    if (!command2) {
        if (npcs.length === 0) {
            addLog("There is nobody in the room offering a quest")
            return
        }
        if (npcs.length > 1) {
            addLog("You must specify whose quest you wish to see")
            return
        }
        if (npcs.length === 1) {
            const npc = npcs[0]
            const npcDialogue = await fetchNpcQuestDialogue(playerId, npc.id)
            npcDialogue.forEach(paragraph => {
                const dialogueJSX = npcSpeaks(npc, paragraph)
                addLog(dialogueJSX)
            })
        }
    }
    if (command2) {
        const npc = npcs.find(npc => npc.name.toLowerCase() === command2)
        const npcId = npc.id
        const npcDialogue = await fetchNpcQuestDialogue(playerId, npcId)
        for (const paragraph of npcDialogue) {
            const dialogueJSX = npcSpeaks(npc, paragraph)
            await wait(200)
            if (!playerStatus.current.isTalking) {return}
            addLog(dialogueJSX)
        }
    }
    toggleStatusFalse(playerStatus, "isTalking")
}

export const playerLook = async (commandObject) => {
    const { addLog, player, setCurrentArea, setNpcs, setEnemies, setItems, setPlayers } = commandObject
    let enemies
    let npcs
    let items
    let players
    let areaId = !player.area_id ? 1 : player.area_id
    let playerId = player.id
    const area = await fetchCurrentArea(areaId)
    setCurrentArea(area)

    enemies = await fetchEnemiesInRoom(areaId)
    setEnemies(enemies)

    npcs = await fetchCurrentAreaNpcs(areaId)
    setNpcs(npcs)
    
    items = await fetchCurrentAreaItems(areaId)
    setItems(items)

    players = await fetchPlayersInRoom(areaId, playerId)
    setPlayers(players)
    
    addLog(areaDisplay(area, enemies, npcs, items, players))
}

export const playerExamine = async (commandObject) => {
    const { command2, currentArea, addLog } = commandObject
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

export const playerPull = async (commandObject) => {
    const { command2, currentArea, setCurrentArea, addLog } = commandObject
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

export const playerGet = async (commandObject) => {
    const { command2, currentArea, setItems, player, addLog, setPlayerItems } = commandObject
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
