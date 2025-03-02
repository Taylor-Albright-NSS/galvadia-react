import { npcDTO } from "../models/dtos/npcDTO.js";
import { Npc } from "../models/npc.js";
import { NpcDialogue } from "../models/npcDialogue.js";
import NpcQuest from "../models/npcQuest.js";
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
// export const getNpcById = async(req, res) => {
//   const { id } = req.params
//   const npc = await Npc.findOne({where: {id: id}})
//   let npcDTO = {
//     id: npc.id,
//     name: npc.name
//   }
//   res.json(npcDTO)
// }



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
  // const dialogueIndex = playerNpc.dialogueIndex % dialogueArray.length;
  // const chosenDialogue = dialogueArray[dialogueIndex];
  // playerNpc.dialogueIndex = (dialogueIndex + 1) % dialogueArray.length;
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

export const getNpcQuest = async (req, res) => {
  const { npcId, questStage } = req.params
  const quest = await NpcQuest.findOne({
    where: {
      npcId: npcId,
      questStage: questStage
    }
  })
  console.log(quest, " quest")
  if (!quest) {
    return res.status(404).json({message: "Quest not found"})
  }
  return res.status(200).json(quest)
}