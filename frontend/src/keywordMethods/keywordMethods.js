import { fetchDirectionToUnlock } from "../fetches/areas/directions"

export const keywordMethods = {
    pullLever: async function(currentArea, keyword) {
        console.log(keyword)
        console.log(currentArea)
        const response = await fetchDirectionToUnlock(currentArea.id, keyword.actionDirections)
        console.log(response)
        return response
    }
}