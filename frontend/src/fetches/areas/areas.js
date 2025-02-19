const api = "http://localhost:3000"

export const fetchAreas = async () => {
    const response = await fetch(`${api}/areas`)
    const data = await response.json()
    return data
}