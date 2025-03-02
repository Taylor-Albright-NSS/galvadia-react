import { fetchDirectionToUnlock } from "../fetches/areas/areas"

const api = "http://localhost:3000"

export const keywordMethods = {
    pullLever: async function(currentArea, keyword) {
        const response = await fetchDirectionToUnlock(currentArea.id, keyword.actionDirections)
        return response
    }
}