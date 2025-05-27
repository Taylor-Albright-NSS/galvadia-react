import { fetchNpcQuestDialogue, questRequirementCheck } from '../fetches/npcs/npcs'
import { npcSpeaks } from '../DOMrenders/npcActions'
import { fetchAllItemsThatBelongToPlayer, fetchPlayerDropsItem } from '../fetches/items/items'
import { wait } from '../utils/wait'
import { playerDropsJSX } from '../playerActions/jsxFunctions'
import { dropItemByKeyword, findItemByLeft, findItemByNumber, findItemByRight, itemFindByKeywordUtil, playerItemFindByKeywordUtil, playerItemFindByNumberUtil, unpackItemByKeyword } from '../utils/utilsItem'
import { enemyFindByName, enemyFindByNumber, findEnemy, findEnemyInCombatWithPlayer, findNpcByName } from '../utils/utilsEnemy'
import { playerIsInCombatCheck, toggleStatusFalse, toggleStatusTrue } from '../utils/utilsPlayer'
import { playerAdvancesEnemySender, playerEquipsArmorSender, playerLooksSender, playerPacksItemSender, playerPicksUpItemSender, playerRegularAttackSender, playerRemovesArmorSender, playerRetreatsSender, playerSpeaksToNpcSender, playerUnpacksItemSender } from '../senders/sendersPlayer'
import { itemExamineDisplay } from '../DOMrenders/itemDescriptionDisplay'
import { enemyExamineDisplay } from '../DOMrenders/enemyDescriptionDisplay'

export const playerOffersQuest = async commandObject => {
	const { setGameData } = commandObject
	const { player, players, playerItems, currentArea, npcs, enemies, items } = commandObject.gameData
	const { command2, addLog } = commandObject
	let body = {
		npcId: 0,
		playerId: player.id,
		playerLevel: player.level,
		playerInventory: playerItems,
		//add player kill list here
	}
	if (npcs.length === 0) {
		return addLog('There is nobody in the room offering quests.')
	}
	if (npcs.length > 1 && !command2) {
		return addLog('You must specify whose quest you wish to see.')
	}
	if (npcs.length === 1) {
		body.npcId = npcs[0].id
		const questNpc = await questRequirementCheck(body)
		return
	}
	if (npcs.length > 1) {
		const foundNpc = findNpcByName(npcs, command2)
		const npcName = foundNpc.Npc.name
		body.npcId = foundNpc.id
		const questOffering = await questRequirementCheck(body)
		if (questOffering.message === '404') {
			return addLog(`${npcName} does not have a quest for you to make an offer to.`)
		}
		if (questOffering.message === 'level') {
			return addLog(`You do not meet the level requirement for this quest.`)
		}
		if (questOffering.message === 'item') {
			return addLog(`You have not offered the correct item(s) required for this quest.`)
		}
		if (questOffering.player) {
			const dialogueJSX = npcSpeaks(foundNpc, questOffering.completionDialogue)
			addLog(dialogueJSX)
			const { player } = questOffering
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
}

export const playerSpeaksToNpcService = async commandObject => {
	const { player, players, playerItems, currentArea, npcs, enemies, items } = commandObject.gameData
	const { command2, addLog, ws } = commandObject
	if (npcs.length === 0) {
		return addLog('There is nobody in the room to speak with')
	}
	if (npcs.length > 1 && !command2) {
		return addLog('You must specify who you want to speak with')
	}
	if (npcs.length > 1) {
		const foundNpc = findNpcByName(npcs, command2)
		playerSpeaksToNpcSender(player.id, foundNpc.id, ws)

		// const npcDialogue = await fetchNpcDialogue(player.id, foundNpc.id)
		// const dialogueJSX = npcSpeaks(foundNpc, npcDialogue)
		// addLog(dialogueJSX)
		return
	}
}


export const playerSpeakToNpcQuest = async commandObject => {
	const { player, players, playerItems, currentArea, npcs, enemies, items } = commandObject.gameData
	const { command2, addLog, playerStatus } = commandObject
	toggleStatusTrue(playerStatus, 'isTalking')
	const playerId = player.id
	if (!command2) {
		if (npcs.length === 0) {
			addLog('There is nobody in the room offering a quest')
			return
		}
		if (npcs.length > 1) {
			addLog('You must specify whose quest you wish to see')
			return
		}
		if (npcs.length === 1) {
			const npc = npcs[0]
			const npcDialogue = await fetchNpcQuestDialogue(playerId, npc.id)
			npcDialogue.forEach(paragraph => {
				const dialogueJSX = npcSpeaks(npc, paragraph)
				addLog(dialogueJSX)
			})
		}
	}
	if (command2) {
		const npc = findNpcByName(npcs, command2)
		const npcName = npc.Npc.name
		// const npc = npcs.find(npc => npc.Npc.name.toLowerCase() === command2)
		if (!npc) {
			addLog(`There is nobody here named ${command2} offering a quest.`)
			return
		}
		const npcId = npc.id
		const npcDialogue = await fetchNpcQuestDialogue(playerId, npcId)
		if (!npcDialogue.success) {
			addLog(`${npcName} is not currently offering any quests.`)
			return
		}
		for (const paragraph of npcDialogue.message) {
			const dialogueJSX = npcSpeaks(npc, paragraph)
			await wait(100)
			if (!playerStatus.isTalking) {
				return
			}
			addLog(dialogueJSX)
		}
	}
	toggleStatusFalse(playerStatus, 'isTalking')
}

export const playerLookService = async (commandObject) => {
	const { player } = commandObject.gameData
	const { ws } = commandObject
	console.log(player, " PLAYER")
	const areaId = !player.area_id ? 1 : player.area_id
	const playerId = player.id
	playerLooksSender(playerId, areaId, ws)
}

// export const playerLook = async commandObject => {
// 	const { player } = commandObject.gameData
// 	const { setGameData, addLog } = commandObject

// 	let areaId = !player.area_id ? 1 : player.area_id
// 	let playerId = player.id
	// const [area, enemies, npcs, items, players] = await Promise.all([fetchCurrentArea(areaId), fetchEnemiesInRoom(areaId), fetchCurrentAreaNpcs(areaId, playerId), fetchCurrentAreaItems(areaId), fetchPlayersInRoom(areaId, playerId)])

// 	setGameData(prev => ({
// 		...prev,
// 		currentArea: area,
// 		enemies: enemies,
// 		npcs: npcs,
// 		items: items,
// 		players: players,
// 	}))

// 	addLog(areaDisplay(area, enemies, npcs, items, players))
// }

export const playerInspectService = (commandObject) => {
	const { player, players, playerItems, currentArea, npcs, enemies, items } = commandObject.gameData
	const { command2, addLog, playerStatus, setGameData } = commandObject
	if (!command2) {
		addLog('You must specify what you want to inspect')
		return
	}
	let foundItem

	if (!Number.isInteger(Number(command2))) {
		addLog('Not number?')
		foundItem = playerItemFindByKeywordUtil(command2, playerItems)
		if (!foundItem) {
			addLog(`You do not have a ${command2} to inspect`)
			return
		}
	} 
	if (Number.isInteger(command2))
		foundItem = playerItemFindByNumberUtil(command2, playerItems)
		if (!foundItem) {
			addLog(`You do not have an item in that slot to inspect`)
			return
		}
	
	itemExamineDisplay(foundItem, addLog)
}

export const playerExamineService = async commandObject => {
	const { player, players, playerItems, currentArea, npcs, enemies, items } = commandObject.gameData
	const { command2, addLog, playerStatus, setGameData } = commandObject
	if (!command2) {return addLog('You must specify what you want to examine')}
	
	const foundKeyword = currentArea?.Keywords.find(keyword => keyword.refName == command2)
	let foundEnemyByNumber = enemyFindByNumber(enemies, command2)
	let foundEnemyByName = enemyFindByName(enemies, command2)
	let foundItem = itemFindByKeywordUtil(items, command2)
	console.log(foundEnemyByNumber, " foundEnemyByNumber")
	console.log(foundEnemyByName, " foundEnemyByName")
	console.log(foundItem, " foundItem")
	console.log(foundKeyword, " foundKeyword")
	
	if (foundItem) {return itemExamineDisplay(foundItem, addLog)}
	if (foundEnemyByName) {return enemyExamineDisplay(foundEnemyByName, addLog)}
	if (foundEnemyByNumber) {return enemyExamineDisplay(foundEnemyByNumber, addLog)}
	if (foundKeyword) {
		const response = await foundKeyword[foundKeyword.methodCode](player, foundKeyword)
		if (foundKeyword?.methodCode != 'examineKeyword') {
			return addLog(foundKeyword?.description)
		}
		if (response.message) {
			addLog(foundKeyword.description)
			addLog(' ')
			addLog(`**This keyword has already been activated**`)
			return
		} else {
			addLog(foundKeyword.displayActivate)
			addLog(`**activating keyword now**`)
			setGameData(prev => ({
				...prev,
				playerItems: [...prev.playerItems, response],
			}))
			return
		}
	}

	if (!foundKeyword && !foundItem && !foundEnemyByName && !foundEnemyByNumber) {
		return addLog(`You do not see a ${command2} to examine`)
	}
}

export const playerPull = async commandObject => {
	const { player, players, playerItems, currentArea, npcs, enemies, items } = commandObject.gameData
	const { command2, addLog, playerStatus, setGameData } = commandObject
	if (!command2) {
		addLog('You must specify what you want to pull')
		return
	}
	const foundKeyword = currentArea.Keywords.find(keyword => keyword.refName == command2)
	if (foundKeyword?.methodCode != 'pullLever') {
		addLog(`You cannot pull the ${command2}`)
		return
	}
	if (!foundKeyword) {
		addLog(`You do not see a ${command2} to pull`)
		return
	}
	if (foundKeyword) {
		console.log(foundKeyword)
		addLog(`You pull the ${foundKeyword.refName}`)
		const response = await foundKeyword[foundKeyword.methodCode](currentArea, foundKeyword)
		const updatedAreaExits = response.updatedArea.exitsBool
		setGameData(prev => ({
			...prev,
			currentArea: { ...prev.currentArea, exitsBool: updatedAreaExits },
		}))
	}
}

export const playerPicksUpItemService = commandObject => {
	const { addLog, command2, ws } = commandObject
	const { player, currentArea, items } = commandObject.gameData
	const itemPickedUp = items.find(({ keywords }) => {
		console.log(keywords.includes(command2))
		return keywords.includes(command2)
	})
	
	if (command2 === 'all') {
		console.log(currentArea.id, " currentArea.id")
		playerPicksUpItemSender(player.id, null, currentArea.id, command2, ws)
		return
	}
	if (!command2) return addLog(`You must specify what you want to pick up`)
	if (!itemPickedUp) return addLog(`You do not see a ${command2} to pick up`)
	playerPicksUpItemSender(player.id, itemPickedUp.id, currentArea.id, null, ws)
}
// export const playerGet = async commandObject => {
// 	const { gameData, setGameData, addLog, command2 } = commandObject
// 	const { player, currentArea } = gameData


// 	if (command2 != 'all') {
// 		addLog('Please specify all')
// 		return
// 	}
// 	if (command2 === 'all') {
// 		const currentAreaItems = await fetchCurrentAreaItems(currentArea.id)
// 		await fetchCurrentAreaItemsToPlayer(currentAreaItems, player.id)
// 		setGameData(prev => ({
// 			...prev,
// 			items: [...prev.items.filter(item => item.ownerId != player.id && item.ownerType != 'player')],
// 		}))
// 		const updatedPlayerInventory = await fetchAllItemsThatBelongToPlayer(player.id)
// 		setGameData(prev => ({
// 			...prev,
// 			playerItems: updatedPlayerInventory,
// 		}))
// 		addLog(`You pick up all the items in the room`)
// 	}
// }


export async function playerDropsItem(commandObject) {
	const { addLog, command2, command3, setGameData } = commandObject
	const areaId = commandObject.gameData.currentArea.id
	const { playerItems } = commandObject.gameData
	if (!command2) {
		return addLog(`You must specify what you want to drop`)
	}
	let droppedItem
	if (command2 == 'right') {droppedItem = findItemByRight(playerItems)} 
	else if (command2 == 'left') {droppedItem = findItemByLeft(playerItems)}
	else if (isNaN(command2)) {droppedItem = dropItemByKeyword(playerItems, command2)}
	else if (!isNaN(command2)) {droppedItem = findItemByNumber(playerItems, command2)}
	if (droppedItem.location !== 'inventory' && 
		(droppedItem.location !== 'rightHand' && 
		droppedItem.location !== 'leftHand')
	) return addLog('You must remove an equipped item before dropping it')
	// if (droppedItem.location !== 'inventory' && (
	// 	droppedItem.location === 'rightHand' ||
	// 	droppedItem.location === 'leftHand'
	// )) return addLog('')

	//negative logic
	if (!droppedItem) {
		return addLog(`You do not have a ${command2} to drop`)
	}
	if (droppedItem.location == 'leftHand' && command2 != 'left') {
		return addLog(`You must specify either left or right to drop something from your hands`)
	}
	if (droppedItem.location == 'rightHand' && command2 != 'right') {
		return addLog(`You must specify either left or right to drop something from your hands`)
	}
	if (droppedItem.location == 'bothHands' && command2 != 'right' && command2 != 'left') {
		return addLog(`You must specify either left or right to drop something from your hands`)
	}
	//positive case
	const updatedDroppedItem = await fetchPlayerDropsItem(areaId, droppedItem.id)
	console.log(updatedDroppedItem, " updatedDroppedItem")
	if (!updatedDroppedItem) {
		return addLog(`Internal server error`)
	}
	setGameData(prev => {
		return ({
		...prev,
		items: [...prev.items, updatedDroppedItem],
		playerItems: prev.playerItems.filter(item => {
			return item.id != updatedDroppedItem.id
		}),
	})})
	const message = playerDropsJSX(updatedDroppedItem)
	addLog(message)
}

export async function playerUnpacksItemService(commandObject) {
	const { addLog, command2, ws } = commandObject
	const playerId = commandObject.gameData.player.id
	const { playerItems } = commandObject.gameData
	if (!command2) {
		return addLog(`You must specify what you want to unpack`)
	}
	const isLeftHandFull = playerItems.some(item => item.location == 'leftHand')
	const isRightHandFull = playerItems.some(item => item.location == 'rightHand')
	const isWieldingTwoHanded = playerItems.some(item => item.location == 'bothHands')

	if ((isLeftHandFull && isRightHandFull) || isWieldingTwoHanded) {
		return addLog(`You cannot unpack anything when both hands are full`)
	}

	let unpackedItem
	if (!isNaN(command2)) {
		unpackedItem = findItemByNumber(playerItems, command2)
	}
	if (isNaN(command2)) {
		unpackedItem = unpackItemByKeyword(playerItems, command2)
	}
	if (unpackedItem === false) {
		return addLog(`You're currently holding that item`)
	}
	if (!unpackedItem && !isNaN(command2)) {
		return addLog(`You don't have an item in that slot to unpack`)
	}
	console.log(unpackedItem, " UNPACKED ITEM")
	// if (unpackedItem.location == "leftHand" || unpackedItem.location == "rightHand") {return addLog(`You are wielding the only ${unpackedItem.name} that you own`)}

	if ((isLeftHandFull || isRightHandFull) && unpackedItem?.isTwoHanded) {
		const message = (
			<div>
				Both hands MUST be FREE in order to hold a <span style={{ color: 'green' }}>${unpackedItem.name}</span>
			</div>
		)
		addLog(message)
		return addLog(`Both hands must be free in order to hold a ${unpackedItem.name}`)
	}
	if (!unpackedItem) {
		return addLog(`You do not have a ${command2} to unpack`)
	}
	console.log(playerId)
	console.log(unpackedItem.id)
	console.log(unpackedItem.location)
	console.log(ws, " ws")
	playerUnpacksItemSender(playerId, unpackedItem.id, unpackedItem.location, ws)
}
export async function playerPacksItemService(commandObject) {
	const { addLog, command2, ws } = commandObject
	const playerId = commandObject.gameData.player.id
	const { playerItems } = commandObject.gameData
	if (!command2) {
		addLog(`You must specify what you want to pack`)
		return
	}

	const packedItem = playerItems.find(item => {
		if (command2 != 'right' && command2 != 'left') {
			return item.keywords.some(keyword => keyword == command2)
		}
		if (command2 == 'right') {
			return item.location == 'rightHand' || item.location == 'bothHands'
		}
		if (command2 == 'left') {
			return item.location == 'leftHand' || item.location == 'bothHands'
		}
	})
	console.log(packedItem, " PACKED ITEM")
	if (!packedItem && command2 == 'right') {
		return addLog(`You are not holding anything in your right hand`)
	}
	if (!packedItem && command2 == 'left') {
		return addLog(`You are not holding anything in your left hand`)
	}
	if (!packedItem) {
		return addLog(`You do not have a ${command2} to pack`)
	}

	playerPacksItemSender(playerId, packedItem.id, packedItem.location, ws)
}

export const playerAttackSender = commandObject => {
	const { addLog, command2, playerStatus, ws } = commandObject
	const { player, enemies } = commandObject.gameData
	console.log(commandObject)
	console.log(enemies)
	let targetEnemy = findEnemyInCombatWithPlayer(enemies, player, command2)
	console.log(targetEnemy)
	if (!targetEnemy) {
		addLog(`You must be in combat to attack`)
		return
	}
	playerRegularAttackSender(player.id, targetEnemy.id, ws)
}

export const playerAdvances = commandObject => {
	const { addLog, command2, command3, setGameData, playerStatus, setPlayerStatus, ws } = commandObject
	const { player, currentArea, enemies, playerItems } = commandObject.gameData
	let targetEnemy = findEnemy(enemies, command2)
	
	if (playerIsInCombatCheck(player.id, enemies)) {
		addLog(`You are already engaged with an enemy`)
		return
	}
	if (!enemies[0]) {
		addLog(`There are no enemies in the room to advance`)
		return
	}
	playerAdvancesEnemySender(player.id, targetEnemy.id, ws)

	const advanceMessage = (
		<div>
			You engage the <span style={{ color: 'red' }}>{targetEnemy.name}</span>
		</div>
	)
	addLog(advanceMessage)
}

export const playerRetreats = commandObject => {
	const { addLog, ws } = commandObject
	const { player, enemies } = commandObject.gameData

	const isPlayerInCombat = enemies.some(({ playerCombatIds }) => playerCombatIds.includes(player.id))
	console.log(isPlayerInCombat, " IS PLAYER IN COMBAT")
	if (!isPlayerInCombat) {
		const message = "You are not in combat"
		addLog(message)
		return
	}
	playerRetreatsSender(player.id, player.area_id, ws)
	const retreatMessage = "You retreat from combat"
	addLog(retreatMessage)
}

export const playerExamineItemUtil = (commandObject) => {
	const { command2, addLog } = commandObject
	const { playerItems } = commandObject.gameData
	if (command2.length > 0) {
		const item = itemFindByKeywordUtil(command2, playerItems)
		if (!item) {
			addLog(`There is no ${command2} to examine`)
		}
	}
}

export const playerEquipsArmorService = (commandObject) => {
	const { player, playerItems } = commandObject.gameData
	const { command2, addLog, ws } = commandObject
	if (!command2) return addLog(`You must specify what you want to equip`)

	const possibleItemsToEquip = playerItems.filter(item => item.location === "rightHand" || item.location === "leftHand")
	console.log(possibleItemsToEquip, " possibleItemsToEquip")
	if (possibleItemsToEquip.length === 0) return addLog(`You must be holding a piece of armor to equip it`)
	const chosenItem = possibleItemsToEquip.find(({ keywords }) => keywords.includes(command2))
	console.log(chosenItem, " chosenItem")
	if (!chosenItem) return addLog(`You are not holding a ${command2} to equip`)
	// eslint-disable-next-line no-prototype-builtins
	if (chosenItem.templateType != "armor") return addLog(`You can only equip armor`)
	const allEquippedItems = playerItems.filter(item => item.location !== 'inventory' && item.location !== 'rightHand' && item.location !== 'leftHand')
	
	



	const isSlotOccupied = allEquippedItems.some(equippedItem => equippedItem.slot === chosenItem.slot)
	if (isSlotOccupied) return addLog(`You already have an item equipped in that slot`)
	
	// allEquippedItems.forEach(equippedItem => {
	// 	if (equippedItem.slot === chosenItem.slot) {
	// 		addLog(`You already have an item equipped in that slot`)
	// 		return
	// 	}
	// })
	
	playerEquipsArmorSender(player.id, chosenItem.id, ws)
}
export const playerRemovesArmorService = (commandObject) => {
	const { player, playerItems } = commandObject.gameData
	const { command2, addLog, ws } = commandObject
	const allEquippedItems = playerItems.filter(item => item.location !== 'inventory' && item.location !== 'rightHand' && item.location !== 'leftHand')
	const itemToRemove = 
	allEquippedItems.find(({ keywords }) => keywords.includes(command2)) || 
	allEquippedItems.find(({ slot }) => slot === command2)

	if (!itemToRemove) {return addLog(`You do not have a ${command2} to remove`)}
	if (!command2) return addLog(`You must specify what you want to remove`)

	playerRemovesArmorSender(player.id, itemToRemove.id, ws)
}
