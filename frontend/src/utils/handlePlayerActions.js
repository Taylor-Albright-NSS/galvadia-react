import { command1Alias } from "./command1Alias"
import { actionList } from "./actionList"
import { normalizeInput } from "./normalizeInput"


export const handleEnterPress = (e, commandObject) => {
    //You can just use sendMessage to use the shorthand version. I'm using socket.send to
    //  get practice with typing it out
    if (e.keyCode != 13) {return}
    const rawInput = e.target.value
    const { gameData, socket } = commandObject
    const { player } = gameData
    console.log(commandObject, " COMMAND OBJECT")
    if (rawInput[0] === "'") {
        let normalizedInput = rawInput.slice(1)
        socket.send(JSON.stringify({type: "playerDialogue", playerId: player.id, areaId: player.area_id, playerName: player.name, playerDialogue: normalizedInput}))
        e.target.value = ""
        return
    }
    e.target.value = ""
    const userInput = normalizeInput(rawInput)
    commandObject.command1 = command1Alias(userInput[0])
    commandObject.command2 = userInput[1]
    commandObject.command3 = userInput[2]
    commandObject.command4 = userInput[3]
    actionList(commandObject)
}

