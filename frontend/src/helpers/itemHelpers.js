export const unpackItemByKeyword = function(playerItems, command2) {
    return playerItems
    .filter(item => item.location != 'right_hand' && item.location != 'left_hand')
    .find(({ keywords }) => keywords.includes(command2))
}
export const dropItemByKeyword = function(playerItems, command2) {
    return playerItems.find(({ keywords }) => keywords.includes(command2))
}


export const findItemsByKeyword = function(playerItems, command2) {
    return playerItems.filter(({ keywords }) => keywords.includes(command2))
}
export const findItemByRight = function(playerItems) {
    return playerItems.find(item => item.location == "right_hand" || item.location == "both_hands")
}
export const findItemByLeft = function(playerItems) {
    return playerItems.find(item => item.location == "left_hand" || item.location == "both_hands")
}
export const findItemByNumber = function(playerItems, command2) {
    let foundItem = playerItems.filter(item => item.location === "inventory")
    .find((_, index) => {
        return index + 1 == command2
    })
    return foundItem
}