const api = "http://localhost:3000"

export const playerUpdateCoordinates = async (player, combinedCoords) => {
    console.log(combinedCoords)
    const response = await fetch(`${api}/player/${player.id}/coordinates`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(combinedCoords)
    })
    if (!response.ok) {
        throw new Error (`Failed to update coordinates`)
    }
    const data = await response.json()
    console.log(data)
    const newCoords = {x: data.x, y: data.y, area_id: data.area_id}
    return newCoords
}