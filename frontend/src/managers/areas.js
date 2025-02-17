const api = "http://localhost:3000"

export const getCurrentArea = async (areaId) => {
    const response = await fetch(`${api}/area/${areaId}`)
    const data = await response.json()
    return data
}

export const getAreaByCoords = async (coords) => {
    const response = await fetch(`${api}/area?x=${coords.x}&y=${coords.y}`)
    const data = await response.json()
    return data
}