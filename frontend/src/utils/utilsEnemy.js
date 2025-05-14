export const findNpcByName = (npcs, command2) => {
    const foundNpc = npcs.find(npc => npc.Npc.name.toLowerCase() === command2)
    return foundNpc
}

export const findEnemy = (enemies, command2) => {
    if (!command2) {return findFirstEnemy(enemies)}
    if (!isNaN(command2)) {return enemyFindByNumber(enemies, command2)}
}

export const findFirstEnemy = (enemies) => {
    return enemies[0]
}

export const enemyFindByNumber = (enemies, command2) => {
    const enemy = enemies[command2 - 1]
    return enemy
}

export const enemyFindByName = (enemies, command2) => {
    const foundEnemy = enemies.find(enemy => enemy.name.toLowerCase() === command2)
    return foundEnemy
}


export const findEnemyInCombatWithPlayer = (enemies, player, command2) => {
    try {
        const allEnemies = findAllEnemiesInCombatWithPlayer(enemies, player)
        if (!allEnemies.length) {
            console.log("!allEnemies.length")
            return null
        }

        let targetEnemy
        
        console.log(allEnemies, " ALL ENEMIES")
        console.log(command2, " command 2")

        if (!command2) {targetEnemy = allEnemies[0]}
        console.log(targetEnemy)
        if (Number.isInteger(Number(command2))) {
            console.log("Command2 is a number!")
            targetEnemy = enemyFindByNumber(allEnemies, command2)
        }
        return targetEnemy
    } catch(error) {
        console.error(`Could not find enemy in combat with player:`, error)
        throw error
    }
}
//Finds all enemies that are in combat with the player
export const findAllEnemiesInCombatWithPlayer = (enemies, player) => {
        const combatEnemies = enemies
        .filter(enemy => {
            console.log(enemy)
            return enemy?.playerCombatIds.some(id => {
                console.log(id)
                console.log(player.id)
                return id === player.id
            })
        })
        console.log(combatEnemies)
        return combatEnemies
}