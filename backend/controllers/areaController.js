import { Area } from "../models/area.js";
import { Enemy } from "../models/enemy.js";
import { Item } from "../models/item.js";
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
  console.log("get by ID")
  const { id } = req.params
  console.log(id, " ID")
  const area = await Area.findOne({
    where: {id: id},
    include: [{
        model: Npc,
        attributes: ['id', 'name']
      },{
        model: Player
      }, {
        model: Keyword
      }, {
        model: Enemy
      }, {
        model: Item
      }
    ]})
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
    console.log(bool, " BEFORE")
    if (bool == "locked") {bool = true}
    else
    if (bool == true) {bool = "locked"}
    console.log(bool, " AFTER")
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
  console.log("get by COORDS")
  const { x, y } = req.query
  if (x && y) {
    const foundArea = await Area.findOne({ 
      where : {x: x, y: y},
      include: [{ model: Npc }, { model: Player }, { model: Keyword }]
    })
    res.status(200).json(foundArea)
  } else {
    res.status(404).json()
  }
}