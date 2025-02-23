import { npcDTO } from "../models/dtos/npcDTO.js";
import { Npc } from "../models/npc.js";

//--------MULTIPLE NPCS
export const getEveryNpc = async (req, res) => {
  try {
    const npcs = await Npc.findAll()
    const npcsDTO = npcs.map(npcDTO)
    res.status(200).json(npcsDTO)
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
}
export const getCurrentAreaNpcs = async (req, res) => {
  try {
    const { areaId } = req.params
    console.log(areaId, " get current area npcs -> area id")
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
  let npcDTO = {
    id: npc.id,
    name: npc.name
  }
  res.json(npcDTO)
}
export const getNpcDialogue = async(req, res) => {
  const { id } = req.params
  const npc = await Npc.findOne({where: {id: id}})
  let npcDTO = {
    dialogue: npc.dialogue
  }
  res.json(npcDTO)
}
