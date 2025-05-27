import { unarmedSwing } from "../flavorText/weaponSwings/unarmed"

export const enemyTakesDamageSetter = (data, setGameData, addLog) => {
    const { enemy, damageObject } = data
    // const { damageType, swingVerb, weaponName, enemyName, actualDamage, blockedDamage} = damageObject
    console.log(data, " data coming from enemyTakesDamageSetter")
    setGameData(prev => ({
        ...prev,
        enemies: prev.enemies.map(prevEnemy => {
            if (prevEnemy.id === enemy.id) {
                return ({
                    ...prevEnemy,
                    health: enemy.health
                })
            } else {
                return prevEnemy
            }
        })
    }))
    const message = unarmedSwing(damageObject)
    addLog(message)
}
export const enemyDiesSetter = (data, setGameData, addLog) => {
    const { enemy, experience, loot } = data
    console.log(loot, " LOOT")
    console.log(experience, " EXPERIENCE")
    setGameData(prev => ({
        ...prev,
        player: ({
            ...prev.player,
            experience: prev.player.experience + experience,
        }),
        items: [...prev.items, ...loot],
        enemies: prev.enemies.filter(prevEnemy => prevEnemy.id !== enemy.id)
    }))
    addLog(`${enemy.name} dies!`)
    loot.forEach(item => {
        addLog(`Enemy drops ${item.name}!`)
    })
}

export const enemySpawnsSetter = (data, setGameData, addLog) => {
    const { enemy } = data
    setGameData(prev => ({
        ...prev,
        enemies: [...prev.enemies, enemy]
    }))
    addLog(`${enemy.name} spawns!`)
}