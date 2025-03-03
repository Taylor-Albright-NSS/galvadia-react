export const wait = async (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, milliseconds)
    })
}