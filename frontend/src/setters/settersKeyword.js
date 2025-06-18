import { npcMoves, npcSpeaks } from "../DOMrenders/npcActions"
import { playerReceivesItemJSX } from "../playerActions/jsxFunctions"

export const keywordActivationSetter  = (data, addLog) => {

    const { eventText, npc, npcText, npcDialogue } = data.payload

    console.log(data, " activate description")
    console.log(data.payload, " payload")
    console.log(eventText)
    if (eventText) {
        eventText.forEach(sentence => {
            addLog(sentence)
        })
    }
    if (npc) {
        if (npcDialogue) {
            const dialogue = npcSpeaks(npc, npcDialogue)
            addLog(dialogue)
        }
        if (npcText) {
            const npcMovesText = npcMoves(npc.name, npcText)
            addLog(npcMovesText)
        }
    }
}
export const keywordExamineSetter  = (data, addLog) => {
    console.log(data)
    const { description, npc, npcText } = data.payload
    //CHANGE BACKEND KEYWORD DESCRIPTIONS TO USE ARRAYS SO MULTIPLE LINES ARE POSSIBLE TO DISPLAY
    if (description) {
        description.forEach(sentence => {
            addLog(sentence)
        })
    }
}

export const readSignSetter = (data, addLog) => {
    const { description } = data
    description.forEach(sentence => {
        addLog(sentence)
    })
}

export const keywordAlreadyActivated = (data, addLog) => {
    const { eventText } = data
    console.log(data, ' already activated data')
        addLog(eventText)
}

export const keywordItemToPlayerSetter = (data, setGameData, addLog) => {
    console.log(data, ' item to player data')
    const { questItem } = data
    setGameData(prev => ({
        ...prev,
        playerItems: [...prev.playerItems, questItem]
    }))
    const eventText = playerReceivesItemJSX(questItem)
    addLog(eventText)
}