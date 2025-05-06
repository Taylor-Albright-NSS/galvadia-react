export const playerRoomTransitionSetter = (data, setGameData) => {
    const { area, enemies, itemsInArea, npcs, players } = data.updatedGameData
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