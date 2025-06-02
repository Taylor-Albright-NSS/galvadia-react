import { fetchCreatePlayerArea, fetchPlayerNpcRelationship } from "../fetches/npcs/npcs"
import { playerDropsItem } from "../services/servicesPlayer"

export const npcSpeakMapper = {
    Egbert: async (playerId, npcId, areaId, ws) => {
        console.log(`NPC MAPPER RUNS`)
        const playerNpc = await fetchPlayerNpcRelationship(playerId, npcId, areaId)
        if (playerNpc.dialogueStage === 1) {
            console.log(playerNpc, " playerNPC")
            fetchCreatePlayerArea(playerId, npcId, areaId)
            // ws.send(JSON.stringify({ type: "playerAction", action: "playerSpeaksToNpc"}))
        }
    }
}