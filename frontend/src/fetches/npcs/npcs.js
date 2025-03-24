const api = "http://localhost:3000"

export const questRequirementCheck = async (body) => {
    const response = await fetch(`${api}/questcomplete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    return data
}

export const fetchCurrentAreaNpcs = async (areaId, playerId) => {
    const response = await fetch(`${api}/npcs/${areaId}/${playerId}`)
    const data = await response.json()
    return data
}

export const fetchNpcById = async (npcId) => {
    const response = await fetch(`${api}/npc/${npcId}`)
    const data = await response.json()
    return data
}

export const fetchNpcDialogue = async (playerId, npcId) => {
    const response = await fetch(`${api}/npcdialogue/${npcId}?playerId=${playerId}`)
    const data = await response.json()
    return data
}
export const fetchNpcQuestDialogue = async (playerId, npcId) => {
    const response = await fetch(`${api}/npcquestdialogue/${npcId}?playerId=${playerId}`)
    const data = await response.json()
    return data
}

// export const fetchNpcDialogue = async (npcId, stage) => {
//     const response = await fetch(`${api}/npcdialogue/${npcId}?stage=${stage}`)
//     const data = await response.json()
//     return data
// }
