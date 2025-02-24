import express from 'express'
import http from 'http'
import { WebSocket, WebSocketServer } from 'ws';

export const app = express();
export const server = http.createServer(app)
export const wss = new WebSocketServer({ server });

let players = {}; // Store connected players

wss.on("connection", (ws) => {
    console.log("A new client connected!")
    ws.on("message", (message) => {
        console.log(2)
        const data = JSON.parse(message)
        data.players = players
        if (data.type === "setPlayerArea") {
            players[data.player]
        }
        if (data.type === "join") {
            console.log(data.playerId, " PLAYER ID")
            players[data.playerId] = ws;
            broadcast({ type: "playerJoined", playerId: data.playerId, player: players });
        }
        if (data.type === "pickupItem") {
            broadcast({
                type: "itemPickedUp",
                itemId: data.itemId,
                playerId: data.playerId
            });
        }
        if (data.type === "josh") {
            console.log(3)
            wss.clients.forEach((client, index) => {
                if (client.readyState === WebSocket.OPEN) {
                    let message
                    if (client === ws) {
                        message = `You are Josh.`
                    } else {
                        message = `Josh claims he is Josh`
                    }
                    console.log(4)
                    client.send(JSON.stringify({
                        type: "joshCommand",
                        id: 44,
                        message: message,
                        player: players
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

// console.log("WebSocket server running on ws://localhost:8080");