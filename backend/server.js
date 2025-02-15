import 'dotenv/config'; // No need for .config()
import express from 'express';
import { sequelize } from './config/db.js';
// import playerRoutes from './routes/playerRoutes'
import { Area } from './models/area.js';
import { Player } from './models/player.js';
import { getPlayers, createPlayer, deletePlayer, putPlayer } from './controllers/playerController.js';
import db from './models/associations.js';
import cors from 'cors';
import { getArea } from './controllers/areaController.js';


const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//--------
app.get('/player/:id', async (req, res) => {
  try {
    const playerId = req.params.id;
    console.log(playerId, " Player Id")
    
    const player = await Player.findByPk(playerId, {
      include: [{ model: sequelize.models.Area, as: 'Area' }]
    });

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.json(player); // Send player data to the frontend
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//--------PLAYERS
app.get('/players', getPlayers);
app.post('/players', createPlayer);
app.put('/player/:id', putPlayer)
app.delete('/player/:id', deletePlayer);
//--------AREAS
app.get('/area/:id', getArea)
app.get('/areas', async (req, res) => {
  try {
    const areas = await Area.findAll();
    res.status(200).json(areas)
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
})
app.post('/areas', async (req, res) => {
  try {
    const { name, heading, description, x, y, z } = req.body
    const areas = await Area.create({ name, heading, description, x, y, z })
    res.status(201).json(areas)
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
})
//--------



db.sequelize.sync()  // Sync the models with the database (create tables)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

