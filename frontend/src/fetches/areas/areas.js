import { keywordMethods } from "../../utils/keywordMethods"

const api = "http://localhost:3000"

export const fetchDirectionToUnlock = async (areaId, direction) => {
    const response = await fetch(`${api}/area/${areaId}/unlock`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({direction})
    })
    const data = await response.json()
    return data
}

export const fetchKeywordActivation = async (player, currentArea, keyword) => {
    // try {
        const keywordResponse = await fetch(`${api}/keywordActivation/`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({player, keyword})
        })
        const keywordData = await keywordResponse.json()
        if (!keywordData.message) {
            console.log(keywordData, " keywordData")
            console.log(keywordData, " keywordData")
            console.log(keywordData, " keywordData")
            console.log(keywordData, " keywordData")
            return keywordData
        }
        if (keywordData.message) {
            return keywordData
        }
    // } catch(error) {

    // }
}
export const fetchSpawnItemToPlayer = async (player, keyword) => {
    try {
        const response = await fetch(`${api}/spawnToPlayer/${player.id}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({player, keyword})
        })
        if (!response.ok) {
            throw new Error(`Spawning item failed`)
        }
        const data = await response.json()
        console.log(data)
        return data
    } catch(error) {
        console.error(`Error: `, error.message)
    }
}
export const fetchItemToSpawn = async (areaId, keywordSpecial) => {
    try {
        const response = await fetch(`${api}/area/${areaId}/spawnItem`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({keywordSpecial})
        })
        if (!response.ok) {
            throw new Error(`Spawning item failed`)
        }
        const data = await response.json()
        console.log(data)
        return data
    } catch(error) {
        console.error(`Error: `, error.message)
    }
}

export const fetchAreas = async () => {
    const response = await fetch(`${api}/areas`)
    const data = await response.json()
    return data
}

export const fetchCurrentArea = async (areaId) => {
    const response = await fetch(`${api}/area/${areaId}`)
    const data = await response.json()
    if (data.Keywords.length > 0) {
        data.Keywords.map(keyword => {
            const method = keywordMethods[keyword.methodCode]
            keyword[keyword.methodCode] = method
        })
    }
    return data
}

export const getAreaByCoords = async (coords) => {
    const response = await fetch(`${api}/area?x=${coords.x}&y=${coords.y}`)
    const data = await response.json()
    return data
}