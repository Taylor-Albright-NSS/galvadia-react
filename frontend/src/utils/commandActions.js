import { moveDirection } from '../playerActions/playerMovement'
import {
	playerAdvances,
	playerAttackSender,
	playerDropsItem,
	playerEquipsArmorService,
	playerExamineService,
	playerInspectService,
	playerLookService,
	playerOffersQuest,
	playerPacksItemService,
	playerPicksUpItemService,
	playerPullService,
	playerReadService,
	playerRecallsService,
	playerRemovesArmorService,
	playerRetreats,
	playerSpeaksToNpcService,
	playerSpeakToNpcQuest,
	playerUnpacksItemService,
} from '../services/servicesPlayer'

import { playerInventoryDisplay } from '../DOMrenders/playerInventoryDisplay'
import { userQuits } from '../services/servicesUser'

export const commandActions = {
	// command1, command2, command3, command4, player, setPlayer, addLog, currentArea, npcs, enemies
	// items, setItems, playerItems, setPlayerItems, players, setPlayers, setNpcs, setEnemies, ws,
	// playerStatus
	look: async commandObject => playerLookService(commandObject),
	speak: async commandObject => playerSpeaksToNpcService(commandObject),
	quest: async commandObject => playerSpeakToNpcQuest(commandObject),
	examine: async commandObject => playerExamineService(commandObject),
	read: async commandObject => playerReadService(commandObject),
	inspect: async commandObject => playerInspectService(commandObject),
	pull: async commandObject => playerPullService(commandObject),
	get: async commandObject => playerPicksUpItemService(commandObject),
	inventory: async commandObject => playerInventoryDisplay(commandObject),
	offer: async commandObject => playerOffersQuest(commandObject),
	unpack: async commandObject => playerUnpacksItemService(commandObject),
	pack: async commandObject => playerPacksItemService(commandObject),
	drop: async commandObject => playerDropsItem(commandObject),
	attack: async commandObject => playerAttackSender(commandObject),
	advance: async commandObject => playerAdvances(commandObject),
	retreat: async commandObject => playerRetreats(commandObject),
	equip: async commandObject => playerEquipsArmorService(commandObject),
	remove: async commandObject => playerRemovesArmorService(commandObject),
	recall: async commandObject => playerRecallsService(commandObject),
	quit: async commandObject => userQuits(commandObject),
}

export const actionList = async commandObject => {
	const { command1, addLog } = commandObject
	if (!commandActions[command1]) {
		addLog('That is not a valid command')
		return
	}
	//This is where the entire commandObject is passed to commandActions
	//It's also where the deconstructed objects below { player, setPlayer, command1, etc } are from
	commandActions[command1](commandObject)
}
const movementDirections = new Set(['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'])

movementDirections.forEach(direction => {
	commandActions[direction] = ({ gameData, setGameData, command1, addLog, ws, playerStatus }) => moveDirection(gameData, setGameData, command1, addLog, ws, playerStatus)
})
