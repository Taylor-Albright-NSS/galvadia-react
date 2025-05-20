import { currentAreaItemsSender } from "../senders/sendersItem"
//EXAMPLE OF A SERVICE WITH ALL THE DECONSTRUCTED PROPS
// export const playerSpeaksToNpcService = async commandObject => {
// 	const { player, players, playerItems, currentArea, npcs, enemies, items } = commandObject.gameData
// 	const { command2, addLog, ws } = commandObject
    // playerSpeaksToNpcSender(player.id, foundNpc.id, ws)



export const currentAreaItemsService = async (commandObject) => {
    const { ws } = commandObject
    const { currentArea } = commandObject.gameData
    currentAreaItemsSender(currentArea.id, ws)
}
//
// export const fetchCurrentAreaItemsToPlayer = async (itemsArray, playerId) => {
//     try {
//         //Backend endpoint
//         //app.put('/items', putCurrentAreaItemsToPlayer)
//         const response = await fetch(`${api}/items?playerId=${playerId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(itemsArray)
//         })
//         if (!response.ok) {
//             throw new Error(`No items to pick up`)
//         }
//         const data = await response.json()
//         return data
//     } catch(error) {
//         console.error(`No items to pick up`)
//     }
// }