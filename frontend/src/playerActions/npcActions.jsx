export const npcSpeaks = (npc, dialogue) => {
    return (
        <div className="d-flex">
            <p className="me-1" style={{color: "red"}}>{npc.name}</p>
            <p>{`says, ${dialogue}`}</p>
        </div>
    )
}