import { fetchCurrentAreaNpcs, fetchNpcDialogue, fetchNpcQuestDialogue, questRequirementCheck } from "../fetches/npcs/npcs"
import { fetchCurrentArea } from "../fetches/areas/areas"
import { areaDisplay } from "../DOMrenders/areaDisplay"
import { npcSpeaks } from "../DOMrenders/npcActions"
import { fetchAllItemsThatBelongToPlayer, fetchCurrentAreaItems, fetchCurrentAreaItemsToPlayer } from "../fetches/items/items"
import { fetchEnemiesInRoom } from "../fetches/enemies/enemies"
import { fetchPlayersInRoom } from "../fetches/players/players"
import { toggleStatusFalse, toggleStatusTrue } from "../utils/playerStatus"
import { wait } from "../utils/wait"
import { findNpcByName } from "../PlayerActionChecks/npcChecks"

export const playerOffersQuest = async (commandObject) => {
    const { npcs, player, setPlayer, playerItems, command2, addLog, setPlayerItems } = commandObject
    let body = {
        npcId: 0,
        playerId: player.id,
        playerLevel: player.level,
        playerInventory: playerItems,
        //add player kill list here
    }
    if (npcs.length === 0) {return addLog("There is nobody in the room offering quests.")}
    if (npcs.length > 1 && !command2) {return addLog("You must specify whose quest you wish to see.")}
    if (npcs.length === 1) {
        body.npcId = npcs[0].id
        const questNpc = await questRequirementCheck(body)
        return
    }
    if (npcs.length > 1) {
        const foundNpc = findNpcByName(npcs, command2)
        body.npcId = foundNpc.id
        const questOffering = await questRequirementCheck(body)
        if (questOffering.message === "404") {return addLog(`${foundNpc.name} does not have a quest for you to make an offer to.`)}
        if (questOffering.message === "level") {return addLog(`You do not meet the level requirement for this quest.`)}
        if (questOffering.message === "item") {return addLog(`You have not offered the correct item(s) required for this quest.`)}
        if (questOffering.player) {
            addLog(questOffering.completionDialogue)
            const { player } = questOffering
            console.log(player)
            setPlayer(player)
            const playerUpdatedItems = await fetchAllItemsThatBelongToPlayer(player.id)
            setPlayerItems(playerUpdatedItems)
        } 
    }
}

export const playerSpeakToNpc = async (commandObject) => {
    const { npcs, command2, addLog, player } = commandObject
    const playerId = player.id
    if (npcs.length === 0) {return addLog("There is nobody in the room to speak with")}
    if (npcs.length > 1 && !command2) {return addLog("You must specify who you want to speak with")}
    if (npcs.length > 1) {
        const foundNpc = findNpcByName(npcs, command2)
        const npcDialogue = await fetchNpcDialogue(playerId, foundNpc.id)
        const dialogueJSX = npcSpeaks(foundNpc, npcDialogue)
        addLog(dialogueJSX)
        return
    }
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
    console.log(commandObject)
    const { player, setCurrentArea, setNpcs, setEnemies, setItems, setPlayers } = commandObject.gameData
    const { setGameData, addLog } = commandObject

    let areaId = !player.area_id ? 1 : player.area_id
    let playerId = player.id
    const [ area, enemies, npcs, items, players ] = await Promise.all([
        fetchCurrentArea(areaId),
        fetchEnemiesInRoom(areaId),
        fetchCurrentAreaNpcs(areaId),
        fetchCurrentAreaItems(areaId),
        fetchPlayersInRoom(areaId, playerId)
    ])
    // setGameData(prev => ({...prev, currentArea: area}))
    // setGameData(prev => ({...prev, enemies: enemies}))
    // setGameData(prev => ({...prev, npcs: npcs}))
    // setGameData(prev => ({...prev, items: items}))
    // setGameData(prev => ({...prev, players: players}))

    setGameData(prev => ({
        ...prev,
        currentArea: area,
        enemies: enemies,
        npcs: npcs,
        items: items,
        players: players
    }))
    
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
    console.log(commandObject)
    const { gameData, setGameData, addLog, command2 } = commandObject
    const { player, currentArea } = gameData
    console.log(commandObject)
    console.log(command2)
    if (command2 != "all") {
        addLog("Please specify all")
        return
    }
    if (command2 === "all") {
        const currentAreaItems = await fetchCurrentAreaItems(currentArea.id)
        await fetchCurrentAreaItemsToPlayer(currentAreaItems, player.id)
        // setItems(prev => prev.filter(item => item.ownerId != player.id && item.ownerType != "player"))
        setGameData(prev => ({
            ...prev,
            items: prev.filter(item => item.ownerId != player.id && item.ownerType != "player")
        }))
        const updatedPlayerInventory = await fetchAllItemsThatBelongToPlayer(player.id)
        // setPlayerItems(updatedPlayerInventory)
        setGameData(prev => ({
            ...prev,
            playerItems: updatedPlayerInventory
        }))
        addLog(`You pick up all the items in the room`)
    }
}

