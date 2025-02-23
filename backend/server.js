import 'dotenv/config'; // No need for .config()
import express from 'express';
import http from 'http'
import {WebSocket, WebSocketServer} from 'ws';
import { sequelize } from './config/db.js';
// import playerRoutes from './routes/playerRoutes'
import { Area } from './models/area.js';
import { Player } from './models/player.js';
import { getPlayers, createPlayer, deletePlayer, putPlayer, getPlayer1API, playerPatchCoords, getAllPlayerItems } from './controllers/playerController.js';
import db from './models/associations.js';
import cors from 'cors';
import { getArea, getAreaByCoords, unlockDirection } from './controllers/areaController.js';
import { getCurrentAreaNpcs, getNpcById, getNpcDialogue, getEveryNpc } from './controllers/npcController.js';
import { createEnemy, deleteEnemy, enemyTakesDamage, getAllEnemiesInDatabase, getAllEnemiesInRoom, getEnemyById } from './controllers/enemyController.js';
import { getCurrentAreaItems, getItems, postNewItem, putCurrentAreaItemsToPlayer } from './controllers/itemController.js';

// const express = require("express")
// const http = require("http")
// const WebSocket = require("ws");

const app = express();
const server = http.createServer(app)
export const wss = new WebSocketServer({ server });
app.use(express.json())
app.use(cors());



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

//--------ENEMIES
app.delete('/enemy/:id', deleteEnemy)
app.post('/enemy/', createEnemy)

app.get('/enemies/:areaId', getAllEnemiesInRoom)
app.get('/enemies/', getAllEnemiesInDatabase)
app.get('/enemy/:id', getEnemyById)

app.patch('/enemy/:id', enemyTakesDamage)

let players = {}; // Store connected players

db.sequelize.sync()  // Sync the models with the database (create tables)
  .then(() => {
    app.listen(3000, () => {
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });




wss.on("connection", (ws) => {
    console.log("A new client connected!")
    ws.on("message", (message) => {
        const data = JSON.parse(message);
        console.log(data)
        if (data.type === "join") {
            players[data.playerId] = ws;
            broadcast({ type: "playerJoined", playerId: data.playerId });
        }

        if (data.type === "pickupItem") {
            broadcast({
                type: "itemPickedUp",
                itemId: data.itemId,
                playerId: data.playerId
            });
        }
        // if (data.type === "josh") {
        //     broadcast({
        //         type: "joshClicked",
        //         id: 44,
        //         message: "Josh and jingle-bells!"
        //     })
        // }
        if (data.type === "josh") {
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    let message
                    if (client === ws) {
                        message = `You are Josh.`
                    } else {
                        message = `Josh claims he is Josh`
                    }
                    console.log("SENDING JOSH TO CLIENT")
                    client.send(JSON.stringify({
                        type: "joshCommand",
                        id: 44,
                        message: message
                    }))
                }
            })
        }
    });

    ws.on("close", () => {
        // Remove disconnected player
        Object.keys(players).forEach((playerId) => {
            if (players[playerId] === ws) {
                delete players[playerId];
                broadcast({ type: "playerLeft", playerId });
            }
        });
    });
});

function broadcast(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

console.log("WebSocket server running on ws://localhost:8080");
