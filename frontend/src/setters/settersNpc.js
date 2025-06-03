import { npcMoves } from "../DOMrenders/npcActions"

export const npcMovesSetter  = (data, setGameData, addLog) => {
    const { npcId, npcName, eventText } = data
    console.log(data, " npcMovesSetter Data")
    setGameData(prev => ({
        ...prev,
        npcs: prev.npcs.filter(npc => npc.id !== npcId)
    }))
    const event = npcMoves(npcName, eventText)
    addLog(event)
}
