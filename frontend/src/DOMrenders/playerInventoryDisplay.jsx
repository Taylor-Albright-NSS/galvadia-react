export const playerInventoryDisplay = (commandObject) => {
    const { playerItems, addLog } = commandObject
    console.log(playerItems, " BEFORE SORT")
    const playerInventory = playerItems.sort((a, b) => {
        return a.name - b.name
    })
    console.log(playerInventory, " AFTER A B SORT")
    addLog(
        <div style={{maxWidth: "100%", width: "100%", border: "8px ridge grey"}}>
            <h4 style={{border: "6px outset grey", textAlign: "center"}}>Inventory</h4>
            {playerInventory.map((item, index) => {
                return (
                    <span key={item.id} className="d-flex">
                        <p>{index + 1}. </p>
                        <p className="green ms-1">{item.name}</p>
                    </span>
                )
            })}
        </div>
    )
}