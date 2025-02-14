import { Input } from "reactstrap"
import { handleEnterPress } from "../../ui functions/uiFunctions"

export const CommandLine = () => {

    const handleInput = () => {

    }

    // const handleEnterPress = (e) => {
    //     if (e.keyCode != 13) {return}
    //     const userInput = e.target.value
    //     const mainWindow = document.getElementById("main-window")
    //     const p = document.createElement("p")
    //     const span = document.createElement("span")
    //     span.textContent = userInput
    //     p.appendChild(span)
    //     mainWindow.appendChild(p)
    //     mainWindow.scrollTop = mainWindow.scrollHeight
    //     e.target.value = ""
    // }

    return (
        <Input 
            type="text"
            style={{border: "4px solid green", height: "30px", padding: 0}}
            onChange={handleInput}
            onKeyDown={(e) => {handleEnterPress(e)}}
            />
    )
}