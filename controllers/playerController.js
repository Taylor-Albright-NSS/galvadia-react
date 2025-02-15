import { create } from '../models/player';

const createPlayer = async (req, res) => {
  const { name, level } = req.body;
  try {
    const player = await create({ name, level });
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create player' });
  }
};

export default { createPlayer };
