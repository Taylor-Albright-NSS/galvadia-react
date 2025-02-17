import { useContext, useEffect, useRef, useState } from "react"
import { zGameContext } from "./zGameContext";
import { areaDisplay } from "../../managers/areaDisplay";

export const MainWindow = () => {
    const containerRef = useRef(null);
    const logEndRef = useRef(null)
    const { currentArea } = useContext(zGameContext)
    const { windowLogs, addLog } = useContext(zGameContext)
    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [windowLogs]);

      useEffect(() => {
        setTimeout(() => {
            addLog(areaDisplay(currentArea))
        }, 1)
      }, [currentArea])

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