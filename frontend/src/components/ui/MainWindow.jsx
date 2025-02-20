import { useContext, useEffect, useRef } from "react"
import { zGameContext } from "./zGameContext";
import { areaDisplay } from "../../managers/areaDisplay";
import { getCurrentArea } from "../../managers/areas";
import { getPlayer1 } from "../../managers/testFetch";

export const MainWindow = () => {
    const logEndRef = useRef(null)
    const { windowLogs, addLog, player, currentArea, setPlayer } = useContext(zGameContext)

    useEffect(() => {
        async function fetchData() {
            const player = await getPlayer1()
            setPlayer(player)
            const area = await getCurrentArea(player.area_id);
            addLog(areaDisplay(area));
        }
        fetchData()
    }, [player.area_id])

    useEffect(() => {
        let test = document.getElementById("main-window")
        test.scrollTop = test.scrollHeight;

    }, [windowLogs]);

    return (
        <div 
            id="main-window"
            style={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                border: "4px solid brown",
                height: "700px",
                alignItems: "flex-start"
            }}>
            {windowLogs.map((element, index) => {
                return <div key={index}>{element}</div>
            })}
        </div>
    )
}