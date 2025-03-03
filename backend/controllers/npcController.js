import { npcDTO } from "../models/dtos/npcDTO.js";
import { Item } from "../models/item.js";
import { Npc } from "../models/npc.js";
import { NpcDialogue } from "../models/npcDialogue.js";
import NpcQuest from "../models/npcQuest.js";
import Player from "../models/player.js";
import { PlayerNpc } from "../models/playerNpc.js";

//--------MULTIPLE NPCS
export const getEveryNpc = async (req, res) => {
  try {
    const npcs = await Npc.findAll()
    // const npcsDTO = npcs.map(npcDTO)
    res.status(200).json(npcs)
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
}
export const getCurrentAreaNpcs = async (req, res) => {
  try {
    const { areaId } = req.params
    // console.log(areaId, " get current area npcs -> area id")
    const npcs = await Npc.findAll({where: {area_id: areaId}})
    const npcsDTO = npcs.map(npcDTO)
    res.status(200).json(npcsDTO)
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
}
//--------SINGLE NPCS
export const getNpcById = async(req, res) => {
  const { id } = req.params
  const npc = await Npc.findOne({where: {id: id}})
  res.json(npc)
}

export const getNpcQuestDialogue = async(req, res) => {
  const { npcId } = req.params
  const { playerId } = req.query
  const playerNpc = await PlayerNpc.findOne({where: {
    playerId: playerId,
    npcId: npcId
  }})
  if (!playerNpc) {
    return res.status(404).json({message: "PlayerNpc not found"})
  }
  const npcDialogue = await NpcQuest.findOne({where: {
    npcId: npcId,
    questStage: playerNpc.questStage
  }})
  if (!npcDialogue) {
    return res.status(404).json({message: "dialogue not found"})
  }
  const dialogueArray = npcDialogue.dialogue
  await playerNpc.save();
  res.status(200).json(dialogueArray)
}
export const getNpcDialogue = async(req, res) => {
  const { npcId } = req.params
  const { playerId } = req.query
  const playerNpc = await PlayerNpc.findOne({where: {
    playerId: playerId,
    npcId: npcId
  }})
  if (!playerNpc) {
    return res.status(404).json({message: "PlayerNpc not found"})
  }
  const npcDialogue = await NpcDialogue.findOne({where: {
    npcId: npcId,
    dialogueStage: playerNpc.dialogueStage
  }})
  if (!npcDialogue) {
    return res.status(404).json({message: "dialogue not found"})
  }
  const dialogueArray = npcDialogue.dialogue
  const dialogueIndex = playerNpc.dialogueIndex % dialogueArray.length;
  const chosenDialogue = dialogueArray[dialogueIndex];
  playerNpc.dialogueIndex = (dialogueIndex + 1) % dialogueArray.length;
  await playerNpc.save();
  res.status(200).json(chosenDialogue)
}




export const getNpcDialogueAll = async(req, res) => {
  const npcDialogue = await NpcDialogue.findAll()
  console.log(npcDialogue)
  res.status(200).json(npcDialogue)
}
//--------GETS ENTIRE QUEST - TESTING ONLY
export const getNpcQuest = async (req, res) => {
  const { npcId, playerId } = req.params
  const playerNpc = await PlayerNpc.findOne({where: { playerId, npcId }})
  if (!playerNpc) {return res.status(404).json({message: "Player not found"})}
  const quest = await NpcQuest.findOne({where: { npcId, questStage: playerNpc.questStage }})
  if (!quest) {return res.status(404).json({message: "Quest not found"})}
  return res.status(200).json(quest)
}

export const postNpcRequirements = async (req, res) => {
  const { npcId, playerId, playerLevel, playerInventory, playerKillList } = req.body
  const playerNpc = await PlayerNpc.findOne({where: { playerId, npcId }})
  let playersRequiredItems
  console.log(playerInventory, " playerInventory")
  if (!playerNpc) {return res.status(404).json({message: "PlayerNpc not found"})}
  const quest = await NpcQuest.findOne({where: { npcId, questStage: playerNpc.questStage }})

  if (!quest) {return res.status(404).json({message: "404"})}

  if (quest.requirements.requiredLevel > playerLevel) {return res.status(400).json({message: "level"})}

  if (quest.requirements.requiredItems) {
    const hasRequiredItem = quest.requirements.requiredItems.every(item => playerInventory.some(invItem => invItem.name.includes(item)))
    playersRequiredItems = quest.requirements.requiredItems.map(itemName => playerInventory.find(item => item.name == itemName)).filter(Boolean)
    if (!hasRequiredItem) {return res.status(400).json({message: "item"})}
    if (!playersRequiredItems) {return res.status(400).json({message: "required items not met"})}
  }

  const player = await Player.findByPk(playerId)
  if (!player) {
    return res.status(404).json({message: "Player not found"})
  }

  await Promise.all(playersRequiredItems.map(async (item) => {
    const itemToDestroy = await Item.findOne({ where: {id: item.id}})
    if (itemToDestroy) {
      await itemToDestroy.destroy()
    }
  }))

  player.gold += quest.rewards.gold || 0
  player.experience += quest.rewards.experience || 0
  player.skillPoints += quest.rewards.skillPoints || 0
  player.attributePoints += quest.rewards.attributePoints || 0 

  playerNpc.questStage++

  await player.save()
  await playerNpc.save()

  return res.status(200).json({player, completionDialogue: quest.completionDialogue})
}

export const patchDecrementQuestStage = async (req, res) => {
  const { npcId, playerId } = req.params
  const playerNpc = await PlayerNpc.findOne({where: {npcId, playerId}})
  if (!playerNpc) {
    return res.status(404).json({message: "Player/Npc relationship not found"})
  }
  playerNpc.questStage = Math.max(1, playerNpc.questStage - 1)
  playerNpc.save()
  return res.status(200).json({message: `quest stage decremented to ${playerNpc.questStage}`})
}
export const patchIncrementQuestStage = async (req, res) => {
  const { npcId, playerId } = req.params
  const playerNpc = await PlayerNpc.findOne({where: {npcId, playerId}})
  if (!playerNpc) {
    return res.status(404).json({message: "Player/Npc relationship not found"})
  }
  playerNpc.questStage = playerNpc.questStage + 1
  playerNpc.save()
  return res.status(200).json({message: `quest stage incremented to ${playerNpc.questStage}`})
}