import { useContext } from "react"
import { look } from "./displayFunctions"
import { moveDirection } from "./playerMovement"
import { command1Alias } from "./command1Alias"
import { zGameContext } from "../components/ui/zGameContext"
import { actionList } from "./actionList"


export const handleEnterPress = (e, player, setPlayer, addLog, 
    currentArea, npcs, enemies, setCurrentArea, items, setItems, 
    playerItems, setPlayerItems, sendMessage, socket, players,
    setPlayers, setNpcs, setEnemies, playerStatus
    ) => {
    //You can just use sendMessage to use the shorthand version. I'm using socket.send to
    //  get practice with typing it out
    if (e.keyCode != 13) {return}
    let rawInput = e.target.value
    if (rawInput[0] === "'") {
        let normalizedInput = rawInput.slice(1)
        // sendMessage(rawInput)
        socket.send(JSON.stringify({type: "playerDialogue", playerId: player.id, areaId: player.area_id, playerName: player.name, playerDialogue: normalizedInput}))
        // rawInput = `${player.name} says, "${rawInput.slice(1)}"`
        // addLog(rawInput)
        e.target.value = ""
        return
    }
    const userInput = normalizeInput(rawInput)
    const commandObject = {
        command1: command1Alias(userInput[0]),
        command2: userInput[1],
        command3: userInput[2],
        command4: userInput[3],
        player: player,
        setPlayer: setPlayer,
        addLog: addLog,
        currentArea: currentArea,
        npcs: npcs,
        enemies: enemies,
        setCurrentArea: setCurrentArea,
        items: items,
        setItems: setItems,
        playerItems: playerItems,
        setPlayerItems: setPlayerItems,
        players: players,
        setPlayers: setPlayers,
        setNpcs: setNpcs,
        setEnemies: setEnemies,
        socket: socket,
        playerStatus: playerStatus
    }
    actionList(commandObject)
    e.target.value = ""
}

export const normalizeInput = (input) => {
    const trimmedInput = input.toLowerCase().trim().split(" ").filter(element => element.length > 0)
    return trimmedInput
}


