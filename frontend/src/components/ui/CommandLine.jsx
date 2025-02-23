/* eslint-disable react/prop-types */
import { Input } from "reactstrap"
import { handleEnterPress } from "../../managers/_handlePlayerActions"
import { useContext } from "react"
import { zGameContext } from "./zGameContext"

export const CommandLine = () => {
    const { player, setPlayer, addLog, currentArea, npcs, setNpcs, enemies, setEnemies, setCurrentArea, items, setItems, playerItems, setPlayerItems } = useContext(zGameContext)

    return (
        <Input 
            type="text"
            style={{border: "4px solid green", height: "30px", padding: 0}}
            onKeyDown={(e) => {handleEnterPress(e, player, setPlayer, addLog, currentArea, npcs, enemies, setCurrentArea, items, setItems, playerItems, setPlayerItems)}}
            />
    )
}