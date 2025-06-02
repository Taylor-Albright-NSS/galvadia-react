import { bowSwing } from "../flavorText/weaponSwings/bow"
import { daggerSwing } from "../flavorText/weaponSwings/dagger"
import { enemyDeath } from "../flavorText/weaponSwings/enemyDeath"
import { onehandedSwing } from "../flavorText/weaponSwings/onehanded"
import { twohandedSwing } from "../flavorText/weaponSwings/twohanded"
import { unarmedSwing } from "../flavorText/weaponSwings/unarmed"

export const enemyTakesDamageSetter = (data, setGameData, addLog) => {
    const { enemy, damageObject } = data
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
    let message
    if (damageObject.weapon.Weapon.weaponSkill === 'unarmed') message = unarmedSwing(damageObject)
    if (damageObject.weapon.Weapon.weaponSkill === 'onehanded') message = onehandedSwing(damageObject)
    if (damageObject.weapon.Weapon.weaponSkill === 'twohanded') message = twohandedSwing(damageObject)
    if (damageObject.weapon.Weapon.weaponSkill === 'dagger') message = daggerSwing(damageObject)
    if (damageObject.weapon.Weapon.weaponSkill === 'bow') message = bowSwing(damageObject)
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
    const enemyDeathMessage = enemyDeath(enemy, experience, loot)
    addLog(enemyDeathMessage)
    // addLog(`The ${enemy.name} !`)
    // loot.forEach(item => {
    //     addLog(`Enemy drops ${item.name}!`)
    // })
}

export const enemySpawnsSetter = (data, setGameData, addLog) => {
    const { enemy } = data
    setGameData(prev => ({
        ...prev,
        enemies: [...prev.enemies, enemy]
    }))
    addLog(`${enemy.name} spawns!`)
}