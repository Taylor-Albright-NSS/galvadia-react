const api = "http://localhost:3000"

// export const questRequirementCheck = async (body) => {
//     try {
//         console.log(1)
//         const response = await fetch(`${api}/questcomplete`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(body)
//         })
//         console.log(2)
        
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`)
//         }
        
//         const data = await response.json()
//         return data
//     } catch (error) {
//         console.error('Error checking quest requirements:', error)
//         throw error
//     }
// }

export const fetchCurrentAreaNpcs = async (areaId, playerId) => {
    const response = await fetch(`${api}/npcs/${areaId}/${playerId}`)
    const data = await response.json()
    console.log(data, " Updated NPCs")
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

export const fetchPlayerNpcRelationship = async (playerId, npcId) => {
    const response = await fetch(`${api}/playernpcrelationship/?playerId=${playerId}&npcId=${npcId}`)
    const data = await response.json()
    console.log(data, ' fetch player npc relationship')
    return data
}

// export const fetchCreatePlayerArea = async (playerId, npcId, areaId) => {
    
//     const response = await fetch(`${api}/createplayernpcrelationship`, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({ playerId, npcId, areaId })
//     })
//     const data = await response.json()
//     console.log(data, ' create player npc relationship')
//     return data
// }

