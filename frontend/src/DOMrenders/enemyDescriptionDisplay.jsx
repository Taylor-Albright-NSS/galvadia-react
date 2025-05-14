export const enemyExamineDisplay = (enemy, addLog) => {
    addLog(
        <div style={{maxWidth: "100%", width: "100%", border: "8px ridge grey"}}>
            <h5>Item Description</h5>
            <h4 style={{border: "6px outset grey", textAlign: "center"}}>{enemy.name}</h4>
            <p>Level: {enemy?.level}</p>
            <p>Health: {enemy?.health}</p>
            <p>Enemy: {enemy?.damage}</p>
            <p>Exp: {enemy?.experience}</p>
        </div>
    )
}