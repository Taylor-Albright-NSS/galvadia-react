export const enemyDeath = (enemy, experience, loot) => {
    console.log(enemy, " enemy")
    console.log(experience, " experience")
    console.log(loot, " loot")
    return (
        <span className="flavor-spacing">
            <span>
                <span>The </span>
                <span className="red">{enemy.name} </span> 
                <span>has been slain! </span> 
                <span>{`(you gain `}</span>
                <span className="light-blue">{experience} </span>
                <span>{`experience points)`}</span>
            </span>
            <span>
                <span>The </span>
                <span className="red">{enemy.name} </span> 
                <span>dropped: </span>
            </span>
            <span style={{display: "flex", flexDirection: "column"}}>
                {loot.map(item => {
                    return (<span style={{marginLeft: "14px"}} className="green" key={item.id}>{item.name}</span>)
                })}
            </span>
        </span>

    )
}