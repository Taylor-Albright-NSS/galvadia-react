import { User } from "../models/user.js";

 export const createPlayer = async (req, res) => {
  const { name, area_id } = req.body;
  try {
    const player = await User.create({ name, area_id });
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create player' });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params 
  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({message: "User not found"})
    }
    res.status(200).json(user)
  } catch(error) {
    return res.status(500).json({message: error})
  }
}