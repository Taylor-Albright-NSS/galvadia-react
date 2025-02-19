const api = "http://localhost:3000"

export const getPlayers = async () =>{
    const response = await fetch(`${api}/players`)
    const data = await response.json()
}

export const getPlayer1 = async () => {
    const response = await fetch(`${api}/player/1`)
    const data = await response.json()
    return data
}

