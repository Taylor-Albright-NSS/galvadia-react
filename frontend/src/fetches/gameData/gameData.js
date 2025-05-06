const api = "http://localhost:3000"

export const fetchGameData = async (playerId, areaId) => {
    console.log("TEST TEST TEST TEST")
    const response = await fetch(`${api}/gamedata/${playerId}/${areaId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    console.log(response.json())
    const data = await response.json()
    console.log(data, " gamedata fetch")
    return data
}
export const fetchGameDataWS = async (socket, playerId, areaId) => {
    console.log(socket, " SOCKET")
    console.log(playerId, " PLAYERID")
    console.log(areaId, " AREAID")
    console.log(socket)
    socket.send(JSON.stringify({type: "fetch", action: "gameData", playerId, areaId}))
}

