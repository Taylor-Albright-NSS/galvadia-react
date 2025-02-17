import { Button } from "reactstrap"
import { getPlayer1, getPlayers } from "../../managers/testFetch"
import { useContext } from "react"
import { zGameContext } from "./zGameContext"

export const PlayerBar = () => {

    const { currentArea } = useContext(zGameContext)
    function logArea() {
    }

    return (
        <div style={{border: "4px solid yellow", height: "264px"}}>
            <div>Player Bar</div>
            <Button onClick={getPlayers}>Fetch players</Button>
            <Button onClick={getPlayer1}>Fetch main player</Button>
            <Button onClick={logArea}>Fetch current area</Button>
        </div>

    )
}