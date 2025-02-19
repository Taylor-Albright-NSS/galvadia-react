import { npcDTO } from "../models/dtos/npcDTO.js";
import { Npc } from "../models/npc.js";

export const getNpcs = async (req, res) => {
  try {
    const npcs = await Npc.findAll()
    const npcsDTO = npcs.map(npcDTO)
    res.status(200).json(npcsDTO)
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
}

export const getNpc = async(req, res) => {
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
