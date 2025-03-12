import Player from "../models/player.js";
import { Op, Sequelize } from "sequelize";
import { wss } from "../websocket.js";
import { sequelize } from "../config/db.js";
import { Item } from "../models/item.js";

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
  console.log(playerId, " playerId")
  console.log(experienceGain, " experienceGain")
  const player = await Player.findByPk(playerId)
  console.log(player, " PLAYER")
  console.log(player.level, " player.level")
  console.log(player.levelCalc, " player.levelCalc")
  if (!player) {
    return res.status(404).json({message: "Player not found"})
  }
  player.experience = Math.max(player.experience + experienceGain, 0)
  console.log(experienceGain, " experienceGain")
  player.level = player.levelCalc
  player.save()
  return res.status(200).json(player)
}

export const playerPatchCoords = async (req, res) => {
  try {
    const { id } = req.params
    const { x, y, area_id, oldAreaId } = req.body
    console.log(id, x, y)
    const playerOldAreaId = oldAreaId
    let counter = 1
    console.log("Does run???")
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

export const patchPlayerPacksItem = async (req, res) => {
  try {
    const { playerId, itemId } = req.params
    // const { designatedHand } = req.query
    // let handSlot = designatedHand === "right" ? "right_hand" : "left_hand"

    const packedItem = await Item.findOne({
      where: {
        id: itemId, ownerId: playerId, ownerType: "player"
      }
    })
    if (!packedItem) {
      return res.status(404).json({message: "Player has nothing in that hand to pack"})
    }

    await packedItem.update({ location: "inventory" })
    // if (playerId <= 0 || itemId <= 0) {return res.status(404).json({message: "playerId and/or itemId invalid"})}
    return res.status(200).json(packedItem)
  } catch(error) {
    console.error(`Error packing item: `, error)
    return res.status(500).json({message: "Error packing item on the backend"})
  }
}

export const patchPlayerUnpacksItem = async (req, res) => {
  try {
    const { playerId, itemId } = req.params
    if (playerId <= 0 || itemId <= 0) {return res.status(404).json({message: "playerId and/or itemId invalid"})}
    const availableHands = playerItemInHandsCheck(playerId)
    const { leftHandOpen, rightHandOpen } = availableHands
    //If both hands are occupied -- fail
    if (!leftHandOpen && !rightHandOpen) {
      return res.status(422).json({message: "Player's hands are full"})
    }
    const unpackedItem = await Item.findOne({
      where: {
        id: itemId, ownerId: playerId, ownerType: "player", location: "inventory",
      }
    })
    //If unpacked item is not found -- fail
    if (!unpackedItem) {
      return res.status(404).json({message: "No item to unpack"})
    }
    //If one of player's hands is occupied and unpacked item is two-handed -- fail
    if ((!leftHandOpen || !rightHandOpen) && unpackedItem.isTwoHanded) {
      return res.status(422).json({message: "Player's hands are full"})
    }


    if (rightHandOpen) {
      await unpackedItem.update({ location: "right_hand" })
      return res.status(200).json({message: "Item unpacked to right hand"})
    }
    if (leftHandOpen) {
      await unpackedItem.update({ location: "left_hand" })
      return res.status(200).json({message: "Item unpacked to left hand"})
    }
    if ((rightHandOpen && leftHandOpen) && unpackedItem.isTwoHanded) {
      await unpackedItem.update({ location: "both_hands" })
      return res.status(200).json({message: "Item unpack to both hands"})
    }
    return res.status(200).json(unpackedItem)

  } catch(error) {
    console.error(`Error unpacking item: `, error)
    return res.status(500).json({error: "Error unpacking item"})
  }
}

const playerItemInHandsCheck = async (playerId) => {
  try {
    const playerFullInventory = Item.findAll({
      where: {ownerType: "player", ownerId: playerId}
    })
    const hands = {
      rightHandOpen: true,
      leftHandOpen: true,
    }
    playerFullInventory.forEach(item => {
      if (item.location == "right_hand") hands.rightHandOpen = false
      if (item.location == "left_hand") hands.leftHandOpen = false
      if (item.location == "both_hands") {
        hands.rightHandOpen = false
        hands.leftHandOpen = false
      }
    })
    return hands
  } catch(error) {
    console.error(`Error checking items in hand: `, error)
    return res.status(500).json({message: "Error checking items in hand"})
  }
}