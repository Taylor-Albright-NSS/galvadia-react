export const enemyTakesDamageSetter = (data, setGameData, addLog) => {
    const { enemy, damage } = data
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
    addLog(`You deal ${damage} damage to the ${enemy.name}!`)
}
export const enemyDiesSetter = (data, setGameData, addLog) => {
    const { enemy, damage, experience, loot } = data
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
    addLog(`You deal ${damage} damage to the ${enemy.name}!`)
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