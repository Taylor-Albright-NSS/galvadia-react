const api = "http://localhost:3000"

export const fetchEnemiesInRoom = async (areaId) => {
    const response = await fetch(`${api}/enemies/${areaId}`)
    const data = await response.json()
    return data
}

export const enemyTakesDamage = async (damage, enemyId, setEnemies, addLog) => {
    const response = await fetch(`${api}/enemy/${enemyId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({damage})
    })
    const enemy = await response.json()
    if (enemy.health <= 0) {
        setEnemies((prev) => prev.filter(filterEnemy => enemy.id !== filterEnemy.id))
        addLog(`${enemy.name} has been slain!`)
    } else {
        setEnemies((prev) => prev.map(enemy => enemy.id === enemy.id ? { ...enemy, health: enemy.health } : enemy))
    }
}

export const enemyDies = async (enemyId) => {
    const response = await fetch(`${api}/enemy/${enemyId}`, {
        method: "DELETE"
    })
    const data = await response.json()
    //data received should be exp, gold, items, etc
    return data
}

export const createEnemy = async () => {
    const response = await fetch(`${api}/enemy`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    })
    const data = await response.json()
    return data
}