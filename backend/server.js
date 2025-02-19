import 'dotenv/config'; // No need for .config()
import express from 'express';
import { sequelize } from './config/db.js';
// import playerRoutes from './routes/playerRoutes'
import { Area } from './models/area.js';
import { Player } from './models/player.js';
import { getPlayers, createPlayer, deletePlayer, putPlayer, getPlayer1API, playerPatchCoords } from './controllers/playerController.js';
import db from './models/associations.js';
import cors from 'cors';
import { getArea, getAreaByCoords, unlockDirection } from './controllers/areaController.js';
import { getNpc, getNpcDialogue, getNpcs } from './controllers/npcController.js';


const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//--------NPCS
app.get('/npcs', getNpcs)
app.get('/npc/:id', getNpc)
app.get('/npc/:id/dialogue', getNpcDialogue)
//--------PLAYER (SINGLE)
app.patch('/player/:id/coordinates', playerPatchCoords)
app.get('/player/:id', getPlayer1API);

//--------PLAYERS
app.get('/players', getPlayers);
app.post('/players', createPlayer);
app.put('/player/:id', putPlayer)
app.put('/player')
app.delete('/player/:id', deletePlayer);
//--------AREAS
app.put('/area/:id/unlock', unlockDirection)
app.get('/area', getAreaByCoords)
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
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

