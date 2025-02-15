import 'dotenv/config'; // No need for .config()
import express from 'express';
import { sequelize } from '../../config/db.js';
// import playerRoutes from './routes/playerRoutes'
import { Area } from '../../models/area.js';
import { Player } from '../../models/player.js';
import db from '../../models/index.js';
import cors from 'cors';


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
//--------
app.get('/', (req, res) => {
  console.log("Attempting to hit root path")
  res.json({ message: 'Welcome to Galvadia Server!!' });
});

app.get('/api', (req, res) => {
  console.log("Attempting to hit /api")
  res.json({ message: 'Server is working!' });
  return res.json()
});

app.post('/players', async (req, res) => {
  try {
    const { name, level, area_id } = req.body;
    const newPlayer = await Player.create({ name, level, area_id });
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/players', async (req, res) => {
  try {
    const players = await Player.findAll(); // Retrieves all players with all properties
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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


db.sequelize.sync({ force: true })  // Sync the models with the database (create tables)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });