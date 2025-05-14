export const itemExamineDisplay = (item, addLog) => {
    addLog(
        <div style={{maxWidth: "100%", width: "100%", border: "8px ridge grey"}}>
            <h5>Item Description</h5>
            <h4 style={{border: "6px outset grey", textAlign: "center"}}>{item.name}</h4>
        </div>
    )
}