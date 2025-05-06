export const findNpcByName = (npcs, command2) => {
    const foundNpc = npcs.find(npc => npc.Npc.name.toLowerCase() === command2)
    return foundNpc
}

export const findEnemy = (enemies, command2) => {
    if (!command2) {return findFirstEnemy(enemies)}
    if (!isNaN(command2)) {return findEnemyByNumber(enemies, command2)}
}

export const findFirstEnemy = (enemies) => {
    return enemies[0]
}

export const findEnemyByNumber = (enemies, command2) => {
    return enemies[command2 - 1]
}