import { Button } from "reactstrap"
import { getPlayer1, getPlayers } from "../../managers/testFetch"
import { useContext } from "react"
import { zGameContext } from "./zGameContext"
import { fetchNpcs } from "../../fetches/npcs/npcs"
import { fetchAreas } from "../../fetches/areas/areas"
import { getCurrentArea } from "../../managers/areas"

export const PlayerBar = () => {

    const { currentArea } = useContext(zGameContext)
    function testMethod() {
        getCurrentArea(1).then(areas => {
        })
    }

    return (
        <div style={{border: "4px solid yellow", height: "264px"}}>
            <div>Player Bar</div>
            <Button onClick={getPlayers}>Fetch players</Button>
            <Button onClick={getPlayer1}>Fetch main player</Button>
            <Button onClick={fetchAreas}>Fetch All Areas</Button>
            <Button onClick={fetchNpcs}>Fetch NPCS</Button>
            <Button onClick={testMethod}>Test The Method</Button>
        </div>

    )
}