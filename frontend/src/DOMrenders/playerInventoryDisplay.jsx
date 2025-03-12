export const playerInventoryDisplay = (commandObject) => {
    const { addLog, gameData } = commandObject
    const playerItems = gameData.playerItems
    console.log(playerItems)
    const playerInventory = playerItems.sort((a, b) => {
        return a.name - b.name
    })
    console.log(playerInventory, " AFTER A B SORT")
    addLog(
        <div style={{maxWidth: "100%", width: "100%", border: "8px ridge grey"}}>
            <h4 style={{border: "6px outset grey", textAlign: "center"}}>Inventory</h4>
            <h5>Equipped</h5>
            
            <h5>Bag</h5>
            {playerInventory.map((item, index) => {
                return (
                    <div key={item.id}>                            
                        <span className="d-flex">
                            <p>{index + 1}. </p>
                            <p className="green ms-1">{item.name}</p>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}