import { useContext } from "react"
import { look } from "./displayFunctions"
import { moveDirection } from "./playerMovement"
import { command1Alias } from "./command1Alias"
import { zGameContext } from "../components/ui/zGameContext"
import { actionList } from "./actionList"


export const handleEnterPress = (e, player, setPlayer, addLog) => {
    if (e.keyCode != 13) {return}
    let rawInput = e.target.value
    if (rawInput[0] === "'") {
        rawInput = `${player.name} says, "${rawInput.slice(1)}"`
        addLog(rawInput)
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
        addLog: addLog
    }
    console.log(commandObject, " COMMAND OBJECT")
    actionList(commandObject)
    e.target.value = ""
}

export const normalizeInput = (input) => {
    const trimmedInput = input.toLowerCase().trim().split(" ").filter(element => element.length > 0)
    console.log(trimmedInput, " trimmed input")
    return trimmedInput
}


