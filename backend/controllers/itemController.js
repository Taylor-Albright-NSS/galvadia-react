import { npcDTO } from "../models/dtos/npcDTO.js";
import { Item } from "../models/item.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.findAll()
    res.status(200).json(items)
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
}

