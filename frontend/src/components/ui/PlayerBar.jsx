import { useContext, useRef, useState } from "react"
import { zGameContext } from "./zGameContext"
import { enemyTakesDamage } from "../../fetches/enemies/enemies"

export const PlayerBar = () => {
    const ref = useRef()
    const { currentArea, setEnemies, enemies, addLog, gameData } = useContext(zGameContext)
    const { player } = gameData
    const [reset, setReset] = useState(0)


   async function attackEnemy() {
        const enemyToAttack = enemies[0]
        const damage = 9
        console.log(enemyToAttack, " player bar enemy")
        enemyTakesDamage(damage, enemyToAttack.id, setEnemies, addLog)
    }

    
    return (
        <div style={{border: "4px solid yellow", height: "100px"}}>
            <div>Player Bar</div>
            <div>Name: {player?.name}</div>
            
            {/* <Button onClick={attackEnemy}>Attack Enemy</Button>
            <Button onClick={() => {console.log(enemies)}}>Check all enemies</Button> */}
        </div>

    )
}