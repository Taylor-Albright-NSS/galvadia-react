export const quickMessage = (userInput) => {
    const mainWindow = document.getElementById("main-window")
    const p = document.createElement("p")
    const span = document.createElement("span")
    span.textContent = userInput
    p.appendChild(span)
    mainWindow.appendChild(p)
    mainWindow.scrollTop = mainWindow.scrollHeight
}