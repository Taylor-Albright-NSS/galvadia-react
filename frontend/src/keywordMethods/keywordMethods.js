import { fetchDirectionToUnlock } from "../fetches/areas/directions"

export const keywordMethods = {
    pullLever: async function(currentArea, keyword) {
        const response = await fetchDirectionToUnlock(currentArea.id, keyword.actionDirections)
        return response
    }
}