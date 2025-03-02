export const normalizeInput = (input) => {
    const trimmedInput = input.toLowerCase().trim().split(" ").filter(element => element.length > 0)
    return trimmedInput
}