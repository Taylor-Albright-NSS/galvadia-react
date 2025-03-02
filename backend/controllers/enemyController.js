import { npcDTO } from "../models/dtos/npcDTO.js";
import { Enemy } from "../models/enemy.js";

export const getAllEnemiesInRoom = async (req, res) => {
  try {
    const { areaId } = req.params
    // console.log(areaId, " get all enemies -> area id")
    if (!areaId || isNaN(areaId)) {
      return res.status(400).json({ message: "Invalid area id"})
    }
    const enemies = await Enemy.findAll({where: {area_id: areaId}})

    return res.status(200).json(enemies)
  } catch(error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getEnemy = async (req, res) => {
  try {
    const npcs = await Enemy.findAll()
    const npcsDTO = enemies.map(npcDTO)
    return res.status(200).json(npcsDTO)
  } catch(error) {
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const createEnemy = async (req, res) => {
  const { areaId } = req.params
  try {
    const enemy = await Enemy.create({
      name: "Kobold",
      area_id: areaId,
      health: 50
    })
    return res.status(201).json(enemy)
  } catch(error) {
    return res.status(500).json({message: "Failed to create enemy"})
  }
}

//--------FOR TESTING
export const deleteEnemy = async (req, res) => {
  const { id } = req.params
  try {
    const enemy = await Enemy.findByPk(id)
    if (!enemy) {
      return res.status(404).json()
      
    }
    await enemy.destroy()
    return res.status(200).json({message: "Enemy was destroyed", enemy: enemy})
    
  } catch(error) {
    return res.status(500).json({message: "Failed to delete enemy"})
    
  }
}

//--------PLAYER KILLS
export const enemyDies = async (enemy, res) => {
  try {
    // const enemy = await Enemy.findByPk(id)
    if (!enemy) {
      return res.status(404).json()
    }
    console.log(`Enemy ID of dead enemy: ${enemy.id} `)
    res.status(200).json(enemy)
    await enemy.destroy()
    
  } catch(error) {
    return res.status(500).json({message: "Failed to delete enemy"})
    
  }
}

export const enemyTakesDamage = async (req, res) => {
  const { id } = req.params
  const { damage } = req.body
  const enemy = await Enemy.findOne({ where: {id: id}})
  enemy.health -= damage
  if (enemy.health <= 0) {
    console.log("Enemy DIES!")
    await enemyDies(enemy, res)
    // return res.status(200).json(enemy)
  } else {
    console.log("Enemy not dead...")
    enemy.save()
    return res.status(200).json(enemy)
  }
}

export const getEnemyById = async (req, res) => {
  const { id } = req.params
  const enemy = await Enemy.findByPk(id)
  return res.status(200).json(enemy)
}

export const getAllEnemiesInDatabase = async (req, res) => {
  const enemies = await Enemy.findAll()
  return res.status(200).json(enemies)
}