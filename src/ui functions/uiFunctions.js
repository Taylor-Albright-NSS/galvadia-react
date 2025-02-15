import { look } from "./displayFunctions"
import { quickMessage } from "./textDisplay"

export const handleEnterPress = (e) => {
    if (e.keyCode != 13) {return}
    const userInput = e.target.value.split(" ")
    e.target.value = ""
    if (userInput[0] == "l" || userInput[0] == "look") {
        look(userInput)
    }
}