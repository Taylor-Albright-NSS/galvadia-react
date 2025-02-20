const api = "http://localhost:3000"

export const fetchEnemies = async () => {
    const response = await fetch(`${api}/enemies?area_id=1`)
    const data = response.json()
    console.log(data, ' ALL ENEMIES')
    return data
}

export const enemyTakesDamage = async (damage, enemyId) => {
    const response = await fetch(`${api}/enemy/${enemyId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({damage})
    })
    const data = await response.json()
    console.log(data)
    return data
}