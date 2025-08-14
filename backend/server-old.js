import 'dotenv/config' // No need for .config()
import express from 'express'
import { sequelize } from './config/db.js'
// import playerRoutes from './routes/playerRoutes'
import { Area } from './models/area.js'
import Player from './models/player.js'
import { getPlayers, createUser, deletePlayer, putPlayer, getPlayer1API, playerPatchCoords, getAllPlayerItems } from './controllers/playerController.js'
import db from './models/associations.js'
import cors from 'cors'
import { getArea, getAreaByCoords, unlockDirection } from './controllers/areaController.js'
import { getCurrentAreaNpcs, getNpcById, getNpcDialogue, getEveryNpc } from './controllers/npcController.js'
import { createEnemy, deleteEnemy, enemyTakesDamage, getAllEnemiesInDatabase, getAllEnemiesInRoom, getEnemyById } from './controllers/enemyController.js'
import { getCurrentAreaItems, getItems, postNewItem, putCurrentAreaItemsToPlayer } from './controllers/itemController.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
//--------ITEMS
app.get('/items', getItems)
app.get('/items/player/:playerId', getAllPlayerItems)
app.get('/items/area/:areaId', getCurrentAreaItems)
app.put('/items', putCurrentAreaItemsToPlayer)
app.post('/item', postNewItem)
//--------NPCS
app.get('/npcs', getEveryNpc)
app.get('/npcs/:areaId', getCurrentAreaNpcs)
app.get('/npc/:id', getNpcById)
app.get('/npc/:id/dialogue', getNpcDialogue)
//--------PLAYER (SINGLE)
app.patch('/player/:id/coordinates', playerPatchCoords)
app.get('/player/:id', getPlayer1API)

//--------PLAYERS
app.get('/players', getPlayers)
app.post('/players', createUser)
app.put('/player/:id', putPlayer)
app.put('/player')
app.delete('/player/:id', deletePlayer)
//--------AREAS
app.put('/area/:id/unlock', unlockDirection)
app.get('/area', getAreaByCoords)
app.get('/area/:id', getArea)
app.get('/areas', async (req, res) => {
	try {
		const areas = await Area.findAll()
		res.status(200).json(areas)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})
app.post('/areas', async (req, res) => {
	try {
		const { name, heading, description, x, y, z } = req.body
		const areas = await Area.create({ name, heading, description, x, y, z })
		res.status(201).json(areas)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

//--------ENEMIES
app.delete('/enemy/:id', deleteEnemy)
app.post('/enemy/', createEnemy)

app.get('/enemies/:areaId', getAllEnemiesInRoom)
app.get('/enemies/', getAllEnemiesInDatabase)
app.get('/enemy/:id', getEnemyById)

app.patch('/enemy/:id', enemyTakesDamage)

db.sequelize
	.sync() // Sync the models with the database (create tables)
	.then(() => {
		app.listen(3000, () => {})
	})
	.catch(err => {
		console.error('Error syncing database:', err)
	})
