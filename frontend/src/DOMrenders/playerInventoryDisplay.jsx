export const playerInventoryDisplay = (commandObject) => {
    const { addLog, gameData } = commandObject
    const playerItems = gameData.playerItems
    const playerInventory = playerItems.sort((a, b) => {
        return a.name - b.name
    })
    addLog(
        <div style={{maxWidth: "100%", width: "100%", border: "8px ridge grey"}}>
            <h4 style={{border: "6px outset grey", textAlign: "center"}}>Inventory</h4>
            <h5>Equipped</h5>
            Right Hand: {<span className="green">{playerInventory.find(item => item.location == "right_hand" || item.location == "both_hands")?.name}</span> || "empty"}
            Left Hand: {<span className="green">{playerInventory.find(item => item.location == "left_hand" || item.location == "both_hands")?.name}</span> || "empty"}
            <h5>Bag</h5>
            {playerInventory
            .filter(item => item.location == "inventory")
            .map((item, index) => {
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