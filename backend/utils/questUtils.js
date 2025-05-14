import { PlayerArea } from '../models/playerArea.js'

export const questCompleteActivateSomething = playerNpc => {
	const { npcId, questStage, playerId, area_id } = playerNpc
	//find npcQuest where npcId
	//Egbert's quest that unlocks east
	//npcId === 3 && questStage === 2
	console.log(playerNpc)
	console.log(npcId, ' npcId')
	console.log(questStage, ' questStage')
	if (npcId === 3 && questStage === 2) {
		questUnblockDirection(playerId, 7)
	}
}

export const questUnblockDirection = async (playerId, areaId) => {
	console.log('quest perform activation')
	const newPlayerArea = await PlayerArea.create({
		playerId,
		area_id: areaId,
		unblockedDirections: {
			east: true,
		},
	})
	await newPlayerArea.save()
}
