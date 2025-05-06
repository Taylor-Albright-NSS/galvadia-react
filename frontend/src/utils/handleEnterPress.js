import { actionList } from "./commandActions"

export const handleEnterPress = (e, commandObject) => {
    //You can just use sendMessage to use the shorthand version. I'm using socket.send to
    //  get practice with typing it out
    if (e.keyCode != 13) {return}
    const rawInput = e.target.value
    const { gameData, ws } = commandObject
    const { player } = gameData
    console.log(commandObject, " COMMAND OBJECT")
    if (rawInput[0] === "'") {
        let normalizedInput = rawInput.slice(1)
        ws.send(JSON.stringify({type: "playerDialogue", playerId: player.id, areaId: player.area_id, playerName: player.name, playerDialogue: normalizedInput}))
        e.target.value = ""
        return
    }
    e.target.value = ""
    const userInput = normalizeInput(rawInput)
    commandObject.command1 = commandAliases(userInput[0])
    commandObject.command2 = userInput[1]
    commandObject.command3 = userInput[2]
    commandObject.command4 = userInput[3]
    actionList(commandObject)
}

const normalizeInput = (input) => {
    const trimmedInput = input.toLowerCase().trim().split(" ").filter(element => element.length > 0)
    return trimmedInput
}

const commandAliases = (command1) => {
    const commandAliases = {
        n: "north",
        ne: "northeast",
        e: "east",
        se: "southeast",
        s: "south",
        sw: "southwest",
        w: "west",
        nw: "northwest",
        l: "look",
        i: "inventory",
        talk: "speak",
        ex: "examine",
        g: "get",
        p: "pack",
        a: "attack",
        ad: "advance",
        re: "retreat"
    }
    return commandAliases[command1] || command1
}

