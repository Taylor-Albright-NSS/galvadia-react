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