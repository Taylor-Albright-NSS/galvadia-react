const api = "http://localhost:3000"

export const getCurrentArea = async (areaId) => {
    const response = await fetch(`area/${areaId}`)
    const data = await response.json()
    return data
}