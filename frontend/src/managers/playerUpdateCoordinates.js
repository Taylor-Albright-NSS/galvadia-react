const api = "http://localhost:3000"

export const playerUpdateCoordinates = async (player, combinedCoords) => {
    try {
        const response = await fetch(`${api}/player/${player.id}/coordinates`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(combinedCoords)
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(`Failed to update player coordinates: ${errorData.message || "Unknown error"}`)
        }
        const data = await response.json()
        const newCoords = { x: data.x, y: data.y, area_id: data.area_id }
        return newCoords
    } catch (error) {
        console.error("Error updating player coordinates:", error)
        return false
    }
};