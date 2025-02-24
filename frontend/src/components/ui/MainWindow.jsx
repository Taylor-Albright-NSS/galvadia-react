import { useContext, useEffect, useRef } from "react"
import { zGameContext } from "./zGameContext";
import { areaDisplay } from "../../managers/areaDisplay";
import { fetchCurrentArea } from "../../managers/areas";
import { getPlayer1 } from "../../managers/testFetch";

export const MainWindow = () => {
    const { windowLogs, addLog, player, currentArea, setPlayer, setEnemies, enemies } = useContext(zGameContext)
    useEffect(() => {
        let mainWindow = document.getElementById("main-window")
        mainWindow.scrollTop = mainWindow.scrollHeight;
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