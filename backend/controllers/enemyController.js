import { npcDTO } from "../models/dtos/npcDTO.js";
import { Enemy } from "../models/enemy.js";

export const getAllEnemiesInRoom = async (req, res) => {
  try {
    const { area_id } = req.params
    if (!area_id || isNaN(area_id)) {
      return res.status(400).json({ message: "Invalid area id"})
    }
    const enemies = await Enemy.findAll({where: {area_id}})
    return res.status(200).json(enemies)
  } catch(error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getEnemy = async (req, res) => {
  try {
    const npcs = await Enemy.findAll()
    const npcsDTO = enemies.map(npcDTO)
    res.status(200).json(npcsDTO)
  } catch(error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const createEnemy = async (req, res) => {
  try {
    const enemy = Enemy.create()
    res.status(201).json(enemy)
  } catch(error) {
    res.status(500).json({message: "Failed to create enemy"})
  }
}

export const enemyTakesDamage = async (req, res) => {
  const { id } = req.params
  const { damage } = req.body
  console.log(id)
  console.log(damage)
  const enemy = await Enemy.findOne({ where: {id: id}})
  enemy.health -= damage
  if (enemy.health <= 0) {
    res.json({message: "Enemy is DEAD!"})
    return
  }
  enemy.save()
  res.status(200).json(enemy)
}
