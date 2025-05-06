import { fetchDirectionToUnlock, fetchKeywordActivation } from "../fetches/areas/areas"

export const keywordMethods = {
    pullLever: async function(currentArea, keyword) {
        const response = await fetchDirectionToUnlock(currentArea.id, keyword.special.direction)
        return response
    },
    examineKeyword: async function(player, currentArea, foundKeyword) {
        const keywordResponse = await fetchKeywordActivation(player, currentArea, foundKeyword)
        return keywordResponse
        
        // const spawnItemResponse = await fetchItemToSpawn(currentArea.id, keyword.special)
        // return response
    }
}