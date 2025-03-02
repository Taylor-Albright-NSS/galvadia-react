/* eslint-disable react/prop-types */
import { Input } from "reactstrap"
import { handleEnterPress } from "../../managers/_handlePlayerActions"
import { useContext } from "react"
import { zGameContext } from "./zGameContext"
import { WebSocketContext } from "./WebSocketContext"

export const CommandLine = () => {
    const { player, setPlayer, addLog, currentArea, npcs, setNpcs, enemies, 
    setEnemies, setCurrentArea, items, setItems, playerItems, setPlayerItems,
    players, setPlayers, playerStatus
    } = useContext(zGameContext)
    const { socket, sendMessage } = useContext(WebSocketContext)
    const commandObject = useContext(zGameContext)
    commandObject.socket = socket
    commandObject.sendMessage = sendMessage

    return (
        <Input 
            type="text"
            style={{border: "4px solid green", height: "30px", padding: 0}}
            onKeyDown={(e) => {handleEnterPress(e, player, setPlayer, addLog, currentArea, npcs, 
            enemies, setCurrentArea, items, setItems, playerItems, setPlayerItems, sendMessage, socket,
            players, setPlayers, setNpcs, setEnemies, playerStatus
            )}}
            />
    )
}