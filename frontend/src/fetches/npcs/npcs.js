const api = "http://localhost:3000"

export const fetchCurrentAreaNpcs = async (areaId) => {
    const response = await fetch(`${api}/npcs/${areaId}`)
    const data = await response.json()
    return data
}

export const fetchNpc = async (npcId) => {
    const response = await fetch(`${api}/npc/${1}`)
    const data = await response.json()
    return data
}

export const fetchNpcDialogue = async (playerId, npcId) => {
    console.log(playerId, " Player ID")
    console.log(npcId, " Npc ID")
    const response = await fetch(`${api}/npcdialogue/${npcId}?playerId=${playerId}`)
    const data = await response.json()
    console.log(data, " DATA")
    return data
}
export const fetchNpcQuestDialogue = async (playerId, npcId) => {
    console.log(playerId, " playerId")
    console.log(npcId, " npcId")
    const response = await fetch(`${api}/npcquestdialogue/${npcId}?playerId=${playerId}`)
    const data = await response.json()
    console.log(data, " DATA")
    return data
}
// export const fetchNpcDialogue = async (npcId, stage) => {
//     const response = await fetch(`${api}/npcdialogue/${npcId}?stage=${stage}`)
//     const data = await response.json()
//     return data
// }
