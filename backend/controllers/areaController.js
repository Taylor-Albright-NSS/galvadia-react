import { Area } from "../models/area.js";
import { Enemy } from "../models/enemy.js";
import { Keyword } from "../models/keyword.js";
import { Npc } from "../models/npc.js";
import { Player } from "../models/player.js";

export const getAreas = async (req, res) => {
  try {
    const areas = await Area.findAll({
      include: [
        { 
          model: Npc,
          attributes: ['id', 'name']
        }
      ]
    })
    res.status(200).json(areas)
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
}

export const getArea = async (req, res) => {
  const { id } = req.params
  const area = await Area.findOne({
    where: {id: id},
    include: {model: Keyword}
  })
  res.status(200).json(area)
}

export const unlockDirection = async (req, res) => {
  const { id } = req.params
  const direction = Object.values(req.body)
  try {
    const area = await Area.findOne({where: {id: id}})
    
    if (!area) {
      return res.status(404).json({ error: "Area not found" })
    }
    let bool = area.exitsBool[direction]
    if (bool == "locked") {bool = true}
    else
    if (bool == true) {bool = "locked"}
    await area.update({
      exitsBool: {
        ...area.exitsBool,
        [direction]: bool
      }
    })
    return res.status(200).json({sucess: true, updatedArea: area})
  } catch(error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getAreaByCoords = async (req, res) => {
  try {
    const { x, y } = req.query
    const foundArea = await Area.findOne({ 
      where : {x: x, y: y},
      include: [{ model: Npc }, { model: Player }, { model: Keyword }]
    })
    if (foundArea == null) {
      return res.status(404).json({message: "Area not found"})
    }
    return res.status(200).json(foundArea)
  } catch(error) {
    return res.status(500).json({error: error.message})
  }
}