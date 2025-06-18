// export const playerLooksSetter = (data, setGameData, addLog) => {

import { playerReceivesItemJSX } from "../playerActions/jsxFunctions"


export const areaCurrentAreaItemsSetter = (data, setGameData, addLog) => {
    const { items } = data
    console.log(data, " SETTER DATA")
    setGameData(prev => {
        console.log(...prev.playerItems, " prev.playerItems")
        console.log(...items, " items")
       return ({
        ...prev,
        items: [...prev.items.filter(item => item.id !== items.id)],
        playerItems: [...items]
    })})
    // addLog(areaDisplay(currentArea, [], [], items, []))
}
export const itemToPlayerSetter = (data, setGameData, addLog) => {
    const { questItem } = data
    console.log(data, ' item to player data')
    setGameData(prev => ({
        ...prev,
        playerItems: [...prev.playerItems, questItem]
    }))
    const eventText = playerReceivesItemJSX(questItem)
    addLog(eventText)
    // addLog(areaDisplay(currentArea, [], [], items, []))
}

export const areaEnableDirection = (data, setGameData, addLog) => {
    const { enabledDirection } = data
    console.log(data, ' ENABLED DIRECTION DATA')
    setGameData(prev => ({
        ...prev,
        currentArea: {
            ...prev.currentArea,
            exitsBool: {
                ...prev.currentArea.exitsBool,
                ...enabledDirection
            }
        }
    }))
}