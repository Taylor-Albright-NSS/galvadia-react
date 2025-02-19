const api = "http://localhost:3000"

export const fetchNpcs = async () => {
    const response = await fetch(`${api}/npcs`)
    const data = await response.json()
    return data
}

export const fetchNpc = async (npcId) => {
    const response = await fetch(`${api}/npc/${1}`)
    const data = await response.json()
    return data
}

export const fetchNpcDialogue = async (npc) => {
    const response = await fetch(`${api}/npc/${npc.id}/dialogue`)
    const data = await response.json()
    return data
}