export const findNpcByName = (npcs, command2) => {
    const foundNpc = npcs.find(npc => npc.name.toLowerCase() === command2)
    return foundNpc
}

