// export const playerLooksSetter = (data, setGameData, addLog) => {


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