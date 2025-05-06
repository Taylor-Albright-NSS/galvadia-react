import Area from '../models/area.js'
import { Enemy } from '../models/enemy.js'
import { Item } from '../models/item.js'
import { Keyword } from '../models/keyword.js'
import { Npc } from '../models/npc.js'
import Player from '../models/player.js'
import { Op } from 'sequelize'
import { PlayerNpc } from '../models/playerNpc.js'

export const getGameData = async data => {
	const { playerId, areaId } = data
	console.log(playerId, areaId, ' playerId and areaId')

	const area = await Area.findOne({ where: { id: areaId }, include: { model: Keyword } })
	const enemies = await Enemy.findAll({ where: { area_id: areaId } })
	const itemsInArea = await Item.findAll({ where: { ownerId: areaId, ownerType: 'area' } })
	const players = await Player.findAll({ where: { area_id: areaId, id: { [Op.ne]: playerId } } })
	const playerNpcs = await PlayerNpc.findAll({ where: { area_id: areaId, playerId: playerId } })
	const allNpcs = await Npc.findAll({ where: { area_id: areaId } })
	const missingNpcs = allNpcs.filter(npc => !playerNpcs.some(playerNpc => playerNpc.npcId === npc.id))
	const newPlayerNpcs = await Promise.all(
		missingNpcs.map(npc => {
			PlayerNpc.create({
				playerId: playerId,
				npcId: npc.id,
				area_id: areaId,
				// dialogueStage: npc.dialogueStage,
				// dialogueIndex: npc.dialogueIndex,
				// questStage: npc.questStage,
			})
		})
	)

	const npcs = await PlayerNpc.findAll({
		where: { area_id: areaId, playerId },
		include: [{ model: Npc }], // Include master NPC reference for name, etc.
	})
	const gameData = { area, enemies, npcs, itemsInArea, players }
	return gameData
}
// export const getGameData = async (req, res) => {
//     const { playerId, areaId } = req.params
//     //fetch current area
//     //enemies in room
//     //current area npcs
//     //current area items
//     //items that belong to player
//     //players in room
//     const area = await Area.findOne({where: {id: areaId},include: {model: Keyword}})
//     const enemies = await Enemy.findAll({where: {area_id: areaId}})
//     // const npcs = await Npc.findAll({ where: {area_id: areaId} })
//     const itemsInArea = await Item.findAll({where: {ownerId: areaId, ownerType: "area"}})
//     const players = await Player.findAll({where: {area_id: areaId, id: {[Op.ne]: playerId}}})
//     // const updatedItems = await Promise.all(
//         //     itemsArray.map(async (item) => {
//     //     const updatedItem = await Item.update(
//     //         { ownerId: playerId, ownerType: "player", location: "inventory" },
//     //         { where: { id: item.id }, returning: true }
//     //     );
//     //     return updatedItem;
//     //     })
//     // );
//         const playerNpcs = await PlayerNpc.findAll({ where: {area_id: areaId, playerId: playerId}})
//         const allNpcs = await Npc.findAll({where: {area_id: areaId}})
//         //filters npcs that the player has not yet interacted with
//         const missingNpcs = allNpcs.filter(npc =>
//           !playerNpcs.some(playerNpc => playerNpc.npcId === npc.id)
//         );
//         const newPlayerNpcs = await Promise.all(
//           missingNpcs.map(npc => {
//             PlayerNpc.create({
//               playerId: playerId,
//               npcId: npc.id,
//               area_id: areaId,
//               // dialogueStage: npc.dialogueStage,
//               // dialogueIndex: npc.dialogueIndex,
//               // questStage: npc.questStage,
//             })
//           })
//         )

//         const npcs = await PlayerNpc.findAll({
//           where: { area_id: areaId, playerId },
//           include: [{ model: Npc }] // Include master NPC reference for name, etc.
//         });
//         const gameData = {area, enemies, npcs, itemsInArea, players}
//         return res.status(200).json(gameData)
// }
