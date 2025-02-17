import { Area } from "../models/area.js";

export const getAreas = async (req, res) => {
  try {
    const areas = await Area.findAll()
    res.status(200).json(areas)
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
}

export const getArea = async (req, res) => {
  const { id } = req.params
  const area = await Area.findOne({where: {id: id}})
  res.status(200).json(area)
}

export const getAreaByCoords = async (req, res) => {
  const { x, y } = req.query
  if (x && y) {
    const foundArea = await Area.findOne({ where : {x: x, y: y}})
    res.status(200).json(foundArea)
  } else {
    res.status(404).json()
  }
}