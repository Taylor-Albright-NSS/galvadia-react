export const npcSpeaks = (npc, dialogue) => {
    console.log(npc)
    console.log(dialogue, " DIALOGUE")
    const npcName = npc?.Npc?.name ? npc.Npc.name : npc?.name

    let multipleDialogue = []

    if (Array.isArray(dialogue)) {
        dialogue.forEach((paragraph, index) => {
            multipleDialogue.push(
            <span className="npc-dialogue" key={index}>
                <span style={{color: "red"}}>{npcName} </span> 
                <span>{`says, "${paragraph}"`}</span>
            </span>)
        })
    }
    console.log(multipleDialogue)

    return (
        multipleDialogue.length > 0 ? 
        <>
        {multipleDialogue} 
        </> :
           <span className="npc-dialogue">
                <span style={{color: "red"}}>{npcName} </span> 
                <span>{`says, "${dialogue}"`}</span>
            </span>
    
    )
}

export const npcMoves = (npcName, eventText) => {
    return (
        <span className="npc-dialogue">
            <span style={{color: "red"}}>{npcName} </span>
            <span>{eventText}</span>
        </span>
    )
}