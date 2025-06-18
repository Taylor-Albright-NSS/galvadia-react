export const adminResetPlayerSetter = async (data, setGameData, addLog) => {
    addLog(`Player has been reset`)
    const { updatedPlayer } = data.payload
    setGameData(prev => ({
        ...prev,
        player: {...updatedPlayer}
    }))
    console.log(data, ' QUEST FAIL DATA')
}