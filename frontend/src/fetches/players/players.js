const api = "http://localhost:3000"

export const fetchPlayersInRoom = async (areaId, playerId) => {
    const response = await fetch(`${api}/players/${areaId}?playerId=${playerId}`)
    const data = await response.json()
    return data
}

export const fetchIncreasePlayerExperience = async (playerId, experienceGain) => {
    try {
        const response = await fetch(`${api}/player/${playerId}/experience`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ experienceGain })
        })
        const player = await response.json()
        if (!response.ok) {
            throw new Error({message: "Response was not ok"})
        }
        return player
    } catch(err) {
        console.error(`Error message: ${err.message}`)
    }
}
export const playerGainsExperienceRequest = async (ws, playerId, experienceGain) => {
    ws.send(JSON.stringify({ type: "playerModify", action: "playerGainsExperience", playerId, experienceGain }))
}

export const getPlayers = async () =>{
    const response = await fetch(`${api}/players`)
    const data = await response.json()
}

export const getPlayer1 = async () => {
    const response = await fetch(`${api}/player/1`)
    const data = await response.json()
    return data
}
export const getPlayer2 = async () => {
    const response = await fetch(`${api}/player/2`)
    const data = await response.json()
    return data
}
