import Player from "../models/player.js";
import { Op, Sequelize } from "sequelize";
import { wss } from "../websocket.js";

export let players = {}

 export const createPlayer = async (req, res) => {
  const { name, area_id } = req.body;
  try {
    const player = await Player.create({ name, area_id });
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create player' });
  }
};

export const playerGainsExperience = async (req, res) => {
  const { playerId } = req.params
  const { experienceGain } = req.body
  const player = Player.findByPk(playerId)
  if (!player) {
    return res.status(404).json({message: "Player not found"})
  }
  player.experience += experienceGain
}

export const playerPatchCoords = async (req, res) => {
  try {
    const { id } = req.params
    const { x, y, area_id, oldAreaId } = req.body
    const playerOldAreaId = oldAreaId
    let counter = 1
    wss.clients.forEach(client => {
      console.log(players[counter].name)
      let player = players[counter]
      if (player.id != parseInt(id)) {
        if (player.areaId === area_id) {
          client.send(JSON.stringify({type: "playerMoves", message: "Player enters the room"}))
        }
      }
      counter++
    })
    
    const player = await Player.findOne({where: { id: id }})
    if (!player) {
      return res.status(404).json({ message: "Player not found" })
    }
    if (!area_id) {
      return res.status(404).json({message: "Area does not exist"})
    }
    player.x = x
    player.y = y
    player.area_id = area_id
    players[id].areaId = area_id
    console.log(playerOldAreaId, " old area id")
    counter = 1
    wss.clients.forEach(client => {
      if (players[counter].id != parseInt(id)) {
        if (playerOldAreaId === players[counter].areaId) {
          client.send(JSON.stringify({type: "playerMoves", message: "Player leaves the room"}))
          console.log("Player leaves the room should be triggered")
        }
      }
      counter++
    })
    await player.save()
    return res.json(player)
  } catch(error) {
    return res.status(500).json({message: "Failed to update player coordinates"})
  }
}


export const getPlayer1API = async (req, res) => {
  try {
    const playerId = req.params.id
    const player = await Player.findByPk(playerId, {
      include: [
        {model: sequelize.models.Area, as: 'Area'},
      ]
    });
    const playerItems = await Item.findAll({where: {ownerId: playerId, ownerType: "player"}})
    player.dataValues.items = playerItems
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.json(player); // Send player data to the frontend
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getPlayers = async (req, res) => {
  try {
    const players = await Player.findAll()
    res.status(200).json(players)
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
}
export const getPlayersInRoom = async (req, res) => {
  const { playerId } = req.query
  const { areaId } = req.params
  try {
    const players = await Player.findAll({
      where: {
        area_id: areaId, 
        id: {
          [Op.ne]: playerId
        }
      }
    })
    res.status(200).json(players)
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
}

export const deletePlayer = async (req, res) => {
  const { id } = req.params
  try {
    const playerToDelete = await Player.findOne({where: {id: id}})
    if (!playerToDelete) {
      return res.status(404).json({ error: "Player not found" })
    }
    await playerToDelete.destroy()
    res.status(204).send()
  } catch(error) {
    res.status(500).json({ error: "Failed to delete player" })
  }
}

export const putPlayer = async (req, res) => {
  const { id } = req.params
  const { name, area_id } = req.body
  try {
    const playerToChange = await Player.findOne({where: {id: id}})
    if (!playerToChange) {
      res.status(404).json({ error: "Player to change not found" })
    }
    await playerToChange.update({ name, area_id })
    res.status(200).json(playerToChange)
  } catch(error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllPlayerItems = async (req, res) => {
  try {
    const { playerId } = req.params
    const playerItems = await Item
    .findAll({
      where: {
        ownerId: playerId, ownerType: "player"
      }
    })
    if (!playerItems) {
      return res.status(204).json({error: "Player items not found"})
    }
    return res.status(200).json(playerItems)
  } catch(error) {
    console.error(`Error fetching items`, error)
    return res.status(500).json({error: "Internal server error"})
  }
}