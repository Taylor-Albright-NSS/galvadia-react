export const findNpcById = (npcs, npcId) => {
    const foundNpc = npcs.find(npc => npc.id === npcId)
    return foundNpc
}