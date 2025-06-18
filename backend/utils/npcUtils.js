import { Npc } from '../models/npc.js'
import { PlayerArea } from '../models/playerArea.js'

export const npcMovementVerbs = {
	moves: 'moves',
	strides: 'strides',
	slinks: 'slinks',
}
export const npcMovementStrings = {
	north: 'to the north',
	northeast: 'to the northeast',
	east: 'to the east',
	southeast: 'to the southeast',
	south: 'to the south',
	southwest: 'to the southwest',
	west: 'to the west',
	northwest: 'to the northwest',
	up: 'above',
	down: 'below',
}
export const enabledDirStr = {
	north: 'north',
	northeast: 'northeast',
	east: 'east',
	southeast: 'southeast',
	south: 'south',
	southwest: 'southwest',
	west: 'west',
	northwest: 'northwest',
	up: 'up',
	down: 'down',
}

export const lockDirType = {
	unblocked: 'unblockedDirections',
	unlocked: 'unlockedDirections',
}

export const npcMapper = {
	Egbert: async (playerNpc, npcName, areaId, ws) => {
		console.log(1)
		if (playerNpc.eventStage === 1) return await egbertSpeakEvent1(playerNpc, npcName, ws)
		console.log(2)
		if (playerNpc.eventStage === 3) return await egbertSpeakEvent2(playerNpc, ws)
		console.log(3)
		if (playerNpc.eventStage === 6) return await egbertSpeakEvent3(playerNpc, ws)
		if (playerNpc.eventStage === 7) return await egbertSpeakEvent4(playerNpc, ws)
		if (playerNpc.eventStage === 8) return await egbertSpeakEvent5(playerNpc, ws)
		if (playerNpc.eventStage === 9) return await egbertSpeakEvent6(playerNpc, ws)
		if (playerNpc.eventStage === 10) return await egbertSpeakEvent7(playerNpc, ws)
		if (playerNpc.eventStage === 11) return await egbertSpeakEvent8(playerNpc, ws)
	},
}

export const updatePlayerNpc = async ({ playerNpc, areaId, dialogueStage, eventStage }) => {
	await playerNpc.update({
		area_id: areaId,
		dialogueStage,
		eventStage,
	})
	console.log(playerNpc, ' playerNpc after update')
}

export const enableDirection = async ({ playerId, areaId, lockType, direction, ws }) => {
	console.log(direction, ' DIRECTION')
	try {
		let playerArea = await PlayerArea.findOne({ where: { playerId, area_id: areaId } })
		if (playerArea) {
			await playerArea.update({
				[lockType]: {
					...playerArea[lockType],
					[direction]: true,
				},
			})
			console.log(playerArea, ' playerArea')
			// return ws.send(JSON.stringify({ type: 'direction', action: 'enable', enabledDirection: playerArea[lockType] }))
		} else {
			playerArea = await PlayerArea.create({
				playerId,
				area_id: areaId,
				[lockType]: {
					[direction]: true,
				},
			})
		}
		return ws.send(JSON.stringify({ type: 'direction', action: 'enable', enabledDirection: playerArea[lockType] }))
	} catch (error) {
		console.error(error)
		throw error
	}
}

const egbertSpeakEvent1 = async (playerNpc, npcName, ws) => {
	console.log(3)
	//Egbert moves west following his introduction speech
	const playerId = playerNpc.playerId
	const lockType = lockDirType.unblocked
	const direction = enabledDirStr.west
	await updatePlayerNpc({ playerNpc, areaId: 2, dialogueStage: 2, eventStage: 2 })
	await enableDirection({ playerId, areaId: 1, lockType, direction, ws })
	const eventText = npcMovementVerbs.strides + ' ' + npcMovementStrings.west
	const payload = {
		type: 'npcEvent',
		action: 'npcMoves',
		npcId: playerNpc.npcId,
		npcName,
		eventText,
	}
	return payload
	// ws.send(JSON.stringify({ type: 'npcEvent', action: 'npcMoves', npcId: playerNpc.npcId, npcName, eventText }))
}

const egbertSpeakEvent2 = async (playerNpc, ws) => {
	//Egbert moves south after you examine the wall
	try {
		const playerId = playerNpc.playerId
		const lockType = lockDirType.unblocked
		const direction = enabledDirStr.south
		await enableDirection({ playerId, areaId: 2, lockType, direction, ws })

		const egbert = await Npc.findOne({ where: { name: 'Egbert' } })
		if (!egbert) {
			throw new Error(`Egbert not found`)
		}

		await playerNpc.update({
			area_id: 3,
			eventStage: 4,
			dialogueStage: 4,
		})
		const eventText = npcMovementVerbs.strides + ' ' + npcMovementStrings.south
		const payload = {
			type: 'npcEvent',
			action: 'npcMoves',
			npcId: egbert.id,
			npcName: egbert.name,
			eventText,
		}
		return payload
	} catch (error) {
		throw error
	}
}

const egbertSpeakEvent3 = async (playerNpc, ws) => {
	console.log(3)
	//Egbert moves to the north after reading sign (reading sign isn't 100% necessary)
	const egbert = await Npc.findOne({ where: { name: 'Egbert' } })
	if (!egbert) {
		throw new Error(`Egbert not found`)
	}
	const playerId = playerNpc.playerId
	const lockType = lockDirType.unblocked
	const direction = enabledDirStr.north
	await updatePlayerNpc({ playerNpc, areaId: 7, dialogueStage: 7, eventStage: 7 })
	await enableDirection({ playerId, areaId: 6, lockType, direction, ws })
	const eventText = npcMovementVerbs.strides + ' ' + npcMovementStrings.north
	const payload = {
		type: 'npcEvent',
		action: 'npcMoves',
		npcId: egbert.id,
		npcName: egbert.name,
		eventText,
	}
	return payload
	// ws.send(JSON.stringify({ type: 'npcEvent', action: 'npcMoves', npcId: playerNpc.npcId, npcName, eventText }))
}
const egbertSpeakEvent4 = async (playerNpc, ws) => {
	console.log(3)
	//Egbert moves to the combat hallway inbetween the dummy training room and equipment room
	const egbert = await Npc.findOne({ where: { name: 'Egbert' } })
	if (!egbert) {
		throw new Error(`Egbert not found`)
	}
	const playerId = playerNpc.playerId
	const lockType = lockDirType.unblocked
	const direction = enabledDirStr.west
	const secondDirection = enabledDirStr.east
	const thirdDirection = enabledDirStr.north
	await updatePlayerNpc({ playerNpc, areaId: 8, dialogueStage: 8, eventStage: 8 })
	await enableDirection({ playerId, areaId: 7, lockType, direction, ws })
	await enableDirection({ playerId, areaId: 1, lockType, direction: secondDirection, ws })
	await enableDirection({ playerId, areaId: 1, lockType, direction: thirdDirection, ws })
	const eventText = npcMovementVerbs.strides + ' ' + npcMovementStrings.west
	const payload = {
		type: 'npcEvent',
		action: 'npcMoves',
		npcId: egbert.id,
		npcName: egbert.name,
		eventText,
	}
	return payload
	// ws.send(JSON.stringify({ type: 'npcEvent', action: 'npcMoves', npcId: playerNpc.npcId, npcName, eventText }))
}
const egbertSpeakEvent5 = async (playerNpc, ws) => {
	console.log('egert speak event 5 ran')
	//Egbert moves west following his introduction speech
	const egbert = await Npc.findOne({ where: { name: 'Egbert' } })
	if (!egbert) {
		throw new Error(`Egbert not found`)
	}
	const playerId = playerNpc.playerId
	const lockType = lockDirType.unblocked
	const direction = enabledDirStr.east
	await updatePlayerNpc({ playerNpc, areaId: 9, dialogueStage: 9, eventStage: 9 })
	await enableDirection({ playerId, areaId: 8, lockType, direction, ws })
	const eventText = npcMovementVerbs.strides + ' ' + npcMovementStrings.east
	const payload = {
		type: 'npcEvent',
		action: 'npcMoves',
		npcId: egbert.id,
		npcName: egbert.name,
		eventText,
	}
	return payload
	// ws.send(JSON.stringify({ type: 'npcEvent', action: 'npcMoves', npcId: playerNpc.npcId, npcName, eventText }))
}
const egbertSpeakEvent6 = async (playerNpc, ws) => {
	console.log('egert speak event 6 ran')
	//Egbert moves west following his introduction speech
	const egbert = await Npc.findOne({ where: { name: 'Egbert' } })
	if (!egbert) {
		throw new Error(`Egbert not found`)
	}
	const playerId = playerNpc.playerId
	const lockType = lockDirType.unblocked
	const direction = enabledDirStr.west
	await updatePlayerNpc({ playerNpc, areaId: 10, dialogueStage: 10, eventStage: 10 })
	await enableDirection({ playerId, areaId: 8, lockType, direction, ws })
	const eventText = npcMovementVerbs.strides + ' ' + npcMovementStrings.west
	const payload = {
		type: 'npcEvent',
		action: 'npcMoves',
		npcId: egbert.id,
		npcName: egbert.name,
		eventText,
	}
	return payload
}
const egbertSpeakEvent7 = async (playerNpc, ws) => {
	console.log('egert speak event 6 ran')
	//Egbert moves west following his introduction speech
	const egbert = await Npc.findOne({ where: { name: 'Egbert' } })
	if (!egbert) {
		throw new Error(`Egbert not found`)
	}
	const playerId = playerNpc.playerId
	const lockType = lockDirType.unblocked
	const direction = enabledDirStr.north
	await updatePlayerNpc({ playerNpc, areaId: 11, dialogueStage: 11, eventStage: 11 })
	await enableDirection({ playerId, areaId: 8, lockType, direction, ws })
	const eventText = npcMovementVerbs.strides + ' ' + npcMovementStrings.east
	const payload = {
		type: 'npcEvent',
		action: 'npcMoves',
		npcId: egbert.id,
		npcName: egbert.name,
		eventText,
	}
	return payload
}
const egbertSpeakEvent8 = async (playerNpc, ws) => {
	console.log('egert speak event 6 ran')
	//Egbert moves west following his introduction speech
	const egbert = await Npc.findOne({ where: { name: 'Egbert' } })
	if (!egbert) {
		throw new Error(`Egbert not found`)
	}
	const playerId = playerNpc.playerId
	const lockType = lockDirType.unblocked
	const direction = enabledDirStr.west
	await updatePlayerNpc({ playerNpc, areaId: 12, dialogueStage: 12, eventStage: 12 })
	await enableDirection({ playerId, areaId: 11, lockType, direction, ws })
	const eventText = npcMovementVerbs.strides + ' ' + npcMovementStrings.west
	const payload = {
		type: 'npcEvent',
		action: 'npcMoves',
		npcId: egbert.id,
		npcName: egbert.name,
		eventText,
	}
	return payload
}
