import { npcSpeaks } from "../DOMrenders/npcActions"
import { fetchAllItemsThatBelongToPlayer } from "../fetches/items/items"

export const questCompleteSetter = async (data, setGameData, addLog) => {
    const { player, quest, npc, completionDialogue } = data.payload
    if (player) {
		const dialogueJSX = npcSpeaks(npc, completionDialogue)
		addLog(dialogueJSX)
		setGameData(prev => ({
			...prev,
			player: player,
		}))
		// setPlayer(player)
		const playerUpdatedItems = await fetchAllItemsThatBelongToPlayer(player.id)
		setGameData(prev => ({
			...prev,
			playerItems: playerUpdatedItems,
		}))
		// setPlayerItems(playerUpdatedItems)
	}

}

export const questFailSetter = async (data, setGameData, addLog) => {
    const { message } = data.payload
    addLog(message)
    console.log(data, ' QUEST FAIL DATA')
}