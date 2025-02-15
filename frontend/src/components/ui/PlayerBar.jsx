import { Button } from "reactstrap"
import { getPlayers, testFetch, testFetch2 } from "../../managers/testFetch"

export const PlayerBar = () => {

    return (
        <div style={{border: "4px solid yellow", height: "264px"}}>
            <div>Player Bar</div>
            <Button onClick={testFetch}>Test fetch</Button>
            <Button onClick={testFetch2}>Test fetch</Button>
            <Button onClick={getPlayers}>Fetch players</Button>
        </div>

    )
}