export const keywordActivationSetter  = (data, addLog) => {
    const { activateDescription } = data
    console.log(activateDescription, " activate description")
    activateDescription.forEach(sentence => {
        addLog(sentence)
    })
}

export const keywordAlreadyActivated = (data, addLog) => {
    const { description } = data
        addLog(description)
}