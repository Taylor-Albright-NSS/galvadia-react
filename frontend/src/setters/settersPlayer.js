import { areaDisplay } from "../DOMrenders/areaDisplay"
import { keywordMethods } from "../utils/keywordMethods"

export const playerRoomTransitionSetter = (data, setGameData) => {
    const { area, enemies, itemsInArea, npcs, players } = data.updatedGameData
    console.log(npcs, " NPCS from MOVING")
    if (area.Keywords.length > 0) {
        area.Keywords.map(keyword => {
            const method = keywordMethods[keyword.methodCode]
            keyword[keyword.methodCode] = method
        })
    }
    setGameData(prev => ({
        ...prev,
        player: data.updatedPlayer,
        currentArea: area,
        enemies,
        items: itemsInArea,
        npcs,
        players,
    }))
}

export const playerLooksSetter = (data, setGameData, addLog) => {
    console.log(data.gameData, " DATA")
    const { currentArea, enemies, npcs, items, players } = data.gameData
    if (currentArea?.Keywords.length > 0) {
        currentArea.Keywords.map(keyword => {
            const method = keywordMethods[keyword.methodCode]
            keyword[keyword.methodCode] = method
        })
    }
    console.log(currentArea, " currentArea")
    console.log(enemies, " enemies")
    console.log(npcs, " npcs")

    setGameData(prev => ({
        ...prev,
        currentArea,
        enemies,
        npcs,
        items,
        players
    }))
    addLog(areaDisplay(currentArea, enemies, npcs, items, players))
} 

export const playerAdvancesEnemySetter = (data, setGameData) => {
    const { enemy } = data
    setGameData(prev => ({
        ...prev,
        enemies: prev.enemies.map(prevEnemy => {
            if (prevEnemy.id === enemy.id) {
                return enemy
            } else {
                return prevEnemy
            }
        })
    }))
}

export const playerRetreatsSetter = (data, setGameData) => {
    const { enemies } = data
    console.log(enemies)
    setGameData(prev => ({
        ...prev,
        enemies: enemies
    }))
}