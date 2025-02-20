import { Button } from "reactstrap"
import { getPlayer1, getPlayers } from "../../managers/testFetch"
import { useContext, useEffect, useRef, useState } from "react"
import { zGameContext } from "./zGameContext"
import { fetchNpcs } from "../../fetches/npcs/npcs"
import { fetchAreas } from "../../fetches/areas/areas"
import { getCurrentArea } from "../../managers/areas"
import { enemyTakesDamage } from "../../fetches/enemies/enemies"

export const PlayerBar = () => {
    const ref = useRef()
    const { currentArea, enemies } = useContext(zGameContext)
    const { addLog } = useContext(zGameContext)
    const [reset, setReset] = useState(0)

    useEffect(() => {
        ref.interval2 = setInterval(() => {
            addLog("Interval 1")
        }, 1000)

    }, [])

    function testMethod() {
        ref.interval = setInterval(() => {
            addLog("Interval 2")
        }, 1000)
    }

    function stopInterval() {
        console.log(ref)
        clearInterval(ref.interval)
        clearInterval(ref.interval2)
    }

    function attackEnemy() {
        const enemyToAttack = currentArea.Enemies[0]
        const damage = 1
        enemyTakesDamage(damage, enemyToAttack.id)
        
    }

    
    return (
        <div style={{border: "4px solid yellow", height: "264px"}}>
            <div>Player Bar</div>
            <Button onClick={testMethod}>Start a timeout</Button>
            <Button onClick={stopInterval}>Stop interval</Button>
            <Button onClick={attackEnemy}>Attack Enemy</Button>
        </div>

    )
}