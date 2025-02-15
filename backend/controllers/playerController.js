import { Player } from "../models/player.js";

 export const createPlayer = async (req, res) => {
  const { name, area_id } = req.body;
  try {
    const player = await Player.create({ name, area_id });
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create player' });
  }
};

export const getPlayers = async (req, res) => {
  try {
    const players = await Player.findAll()
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
