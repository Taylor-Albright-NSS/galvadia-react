export const npcSpeaks = (npc, dialogue) => {
    const npcName = npc.name
    return (
        <div className="d-flex my-1">
            <p className="me-1" style={{color: "red"}}>{npcName}</p>
            <p>{`says, "${dialogue}"`}</p>
        </div>
    )
}