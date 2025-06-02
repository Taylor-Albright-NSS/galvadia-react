export const unpackItemByKeyword = function(playerItems, command2) {
    return playerItems
    .filter(item => item.location != 'rightHand' && item.location != 'leftHand')
    .find(({ keywords }) => keywords.includes(command2))
}
export const dropItemByKeyword = function(playerItems, command2) {
    return playerItems.find(({ keywords }) => keywords.includes(command2))
}

export const findItemsByKeyword = function(playerItems, command2) {
    return playerItems.filter(({ keywords }) => keywords.includes(command2))
}
export const findItemByRight = function(playerItems) {
    return playerItems.find(item => item.location == "rightHand" || item.location == "bothHands")
}
export const findItemByLeft = function(playerItems) {
    return playerItems.find(item => item.location == "leftHand" || item.location == "bothHands")
}
export const findItemByNumber = function(playerItems, command2) {
    let foundItem = playerItems
    .filter(item => item.location === "inventory")
    .find((item, index) =>  index + 1 == command2)
    return foundItem
}

export const itemFindFirstUtil = () => {}
export const itemFindByKeywordUtil = (items, command2) => {
    console.log(command2, " COMMAND2")
    console.log(items, " PLAYERITEMS")
    const foundItem = items.find(({ keywords }) => keywords.some(keyword => keyword === command2))
    return foundItem
}

export const playerItemFindByKeywordUtil = (command2, playerItems) => {
    const foundItem = playerItems.find(({ keywords }) => keywords.some(keyword => keyword === command2))
    return foundItem
}
export const playerItemFindByNumberUtil = (command2, playerItems) => {
    const foundItem = playerItems[command2 - 1]
    return foundItem
}
