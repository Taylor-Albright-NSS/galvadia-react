import { Input } from "reactstrap"

export const CommandLine = () => {

    const handleInput = (e) => {
        const userInput = e.target.value
        const mainWindow = document.getElementById("main-window")
        const p = document.createElement("p")
        const span = document.createElement("span")
        span.textContent = userInput
        p.appendChild(span)
        mainWindow.appendChild(p)
    }
    return (
        <div style={{border: "10px solid green"}}>
            <Input type="text" onChange={handleInput}>INPUT</Input>
        </div>
    )
}