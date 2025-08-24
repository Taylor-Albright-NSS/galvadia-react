import 'dotenv/config' // No need for .config()
import express from 'express'
// import playerRoutes from './routes/playerRoutes'
import Area from './models/area.js'
import { getPlayers, createUser, deletePlayer, putPlayer, getPlayer1API, playerRoomTransition, getAllPlayerItems, getPlayersInRoom, playerGainsExperience, patchPlayerPacksItem, patchPlayerUnpacksItem, patchPlayerDropsItem, getUsersCharacters } from './controllers/playerController.js'
import db from './models/associations.js'
import cors from 'cors'
import { getArea, getAreaByCoords, unlockDirection } from './controllers/areaController.js'
import {
	getCurrentAreaNpcs,
	getNpcById,
	getNpcDialogue,
	getEveryNpc,
	getNpcDialogueAll,
	getNpcQuestDialogue,
	getNpcQuest,
	patchDecrementQuestStage,
	patchIncrementQuestStage,
	getPlayerNpcRelationship,
	patchPlayerNpcDecrementDialogueStage,
	patchPlayerNpcIncrementDialogueStage,
} from './controllers/npcController.js'
import { deleteEnemy, enemySpawns, enemyTakesDamage, getAllEnemiesInDatabase, getAllEnemiesInRoom, getEnemyById } from './controllers/enemyController.js'
import { deleteAllItems, getCurrentAreaItems, getItems, postAreaKeywordSpawn, postOnehandedSword, postSpawnItemToPlayer, putCurrentAreaItemsToPlayer } from './controllers/itemController.js'
import { app } from './websocket.js'
import { getAllUsers, getUser } from './controllers/userController.js'
import { getGameData } from './controllers/gameStateController.js'
import { postLogin, postRegister } from './controllers/authController.js'
import { getAllCharacterClasses, getAllCharacterRaces, getCharacterClassById, getCharacterRaceById } from './controllers/characterCreationController.js'
// import { playerSpeaksNpcUnlocksDirection } from './controllerServices/playerActionsServices.js'

app.use(express.json())
app.use(cors())
//--------AUTH
app.post('/register', postRegister)
app.post('/login', postLogin)
//--------ROUTE TESTING
app.get('/npcquest/:npcId/:playerId', getNpcQuest)
app.patch(`/dialoguestage/:playerId/:npcId/decrement`, patchPlayerNpcDecrementDialogueStage)
app.patch(`/dialoguestage/:playerId/:npcId/increment`, patchPlayerNpcIncrementDialogueStage)
//--------CLASS VALUES
app.get('/character-class/:id', getCharacterClassById)
app.get('/character-classes', getAllCharacterClasses)
//--------RACE VALUES
app.get('/character-race/:id', getCharacterRaceById)
app.get('/character-races', getAllCharacterRaces)
//--------GAME DATA
app.get('/gamedata/:playerId/:areaId', getGameData)
//--------NPC QUEST
// app.post('/questcomplete', postNpcRequirements)
app.patch('/queststage/decrement/:npcId/:playerId', patchDecrementQuestStage)
app.patch('/queststage/increment/:npcId/:playerId', patchIncrementQuestStage)
//--------NPC DIALOGUE
app.get('/npcdialogue/:npcId', getNpcDialogue)
app.get('/npcquestdialogue/:npcId', getNpcQuestDialogue)
app.get('/npcdialogueAll', getNpcDialogueAll)
//--------USER
app.get('/user/:id', getUser)
app.get('/users', getAllUsers)
//--------CHARACTER
app.get(`/user/:id/characters`, getUsersCharacters)
//--------ITEMS
// (MULTIPLE)
app.get('/items', getItems)
app.get('/items/player/:playerId', getAllPlayerItems)
app.get('/items/area/:areaId', getCurrentAreaItems)
app.put('/items', putCurrentAreaItemsToPlayer)
app.delete('/items', deleteAllItems)
// (SINGLE)
// app.post('/item', postNewItem)
// app.post('/item/twohandedsword/:areaId', postTwohandedSword)
app.post('/item/onehandedsword/:areaId', postOnehandedSword)
// app.post('/item/dagger/:areaId', postDagger)
// app.post('/item/crossbow/:areaId', postCrossbow)
// app.patch('/item/pack/:playerId/:itemId', patchPlayerPacksItem)
// app.patch('/item/unpack/:playerId/:itemId', patchPlayerUnpacksItem)
app.patch('/item/drop/:areaId/:itemId', patchPlayerDropsItem)
app.post(`/area/:areaId/spawnItem`, postAreaKeywordSpawn)
app.post(`/spawnToPlayer/:playerId`, postSpawnItemToPlayer)
//--------NPCS
app.get('/npcs', getEveryNpc)
app.get('/npcs/:areaId/:playerId', getCurrentAreaNpcs)
app.get('/npc/:id', getNpcById)
app.get('/npc/:id/dialogue', getNpcDialogue)
app.get('/playernpcrelationship/', getPlayerNpcRelationship)
// app.post('/createUsernpcrelationship', playerSpeaksNpcUnlocksDirection)
//--------PLAYERS
//(SINGLE)
// app.patch('/player/:id/coordinates', playerRoomTransition)
app.patch('/player/:playerId/experience', playerGainsExperience)
app.get('/player/:id', getPlayer1API)

//(MULTIPLE)
app.get('/players', getPlayers)
app.get('/players/:areaId', getPlayersInRoom)
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
//--------KEYWORDS
// app.patch('/keywordActivation/', patchKeywordActivation)
// app.patch('/keywordActivation/:keywordId', patchToggleKeywordFalse)
//--------ENEMIES
app.delete('/enemy/:id', deleteEnemy)
app.post('/enemy/:areaId', enemySpawns)
// app.post('/enemy/:areaId', createEnemy)

app.get('/enemies/:areaId', getAllEnemiesInRoom)
app.get('/enemies/', getAllEnemiesInDatabase)
app.get('/enemy/:id', getEnemyById)

app.patch('/enemy/:id', enemyTakesDamage)

db.sequelize
	.sync() // Sync the models with the database (create tables)
	.then(() => {
		app.listen(3000, () => {})
		console.log(`Node.js server running on 3000`)
	})
	.catch(err => {
		console.error('Error syncing database:', err)
	})
