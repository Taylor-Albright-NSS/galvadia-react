import { fetchDirectionToUnlock, fetchItemToSpawn, fetchKeywordActivation } from "../fetches/areas/areas"

const api = "http://localhost:3000"

export const keywordMethods = {
    pullLever: async function(currentArea, keyword) {
        const response = await fetchDirectionToUnlock(currentArea.id, keyword.special.direction)
        return response
    },
    examineKeyword: async function(player, currentArea, foundKeyword) {
        const keywordResponse = await fetchKeywordActivation(player, currentArea, foundKeyword)
        console.log(keywordResponse, " keywordResponse")
        return keywordResponse
        
        // const spawnItemResponse = await fetchItemToSpawn(currentArea.id, keyword.special)
        // return response
    }
}