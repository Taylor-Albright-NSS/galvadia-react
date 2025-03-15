export const findItemByKeyword = function(playerItems, command2) {
    return playerItems.find(({ keywords }) => keywords.includes(command2))
}
export const findItemsByKeyword = function(playerItems, command2) {
    return playerItems.filter(({ keywords }) => keywords.includes(command2))
}
export const findItemByRight = function(playerItems) {
    return playerItems.find(item => item.location == "right_hand")
}
export const findItemByLeft = function(playerItems) {
    return playerItems.find(item => item.location == "left_hand")
}