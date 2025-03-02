import React, { createContext, useContext, useEffect, useState } from "react";
import { zGameContext } from "./zGameContext";
import { WebSocketContext } from "./WebSocketContext";

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]); // Store received messages
    const { addLog, player } = useContext(zGameContext)

    useEffect(() => {
        if (player.id) {
            if (socket.readyState === WebSocket.OPEN) {
                addLog("SOCKET ALREADY OPEN -> SENDING NOW")
                socket.send(JSON.stringify({ type: "join", playerId: player.id, areaId: player.area_id, name: player.name }))
            }
            socket.onopen = () => {
                addLog("SOCKET OPEN -> SENDING NOW")
                socket.send(JSON.stringify({ type: "join", playerId: player.id, areaId: player.area_id, name: player.name}));
            }
        }
    }, [player.id])

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3001");
        ws.onopen = () => {
            addLog("FRONTEND WEBSOCKET SERVER INITIALIZED")
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log(data)
            if (data.type === "playerDialogue") {addLog(data.dialogue)}
            if (data.type === "playerMoves") {addLog(data.message)}
            setMessages((prev) => [...prev, event.data])
        };

        ws.onerror = (error) => {
            addLog(`Websocket error: ${error}`)
        };
        
        ws.onclose = () => {
            addLog(`Websocket closed`)
        };

        setSocket(ws);

        return () => {
            ws.close(); // Cleanup when component unmounts
        };
    }, []);

    const sendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        } else {
            console.error("WebSocket is not connected");
        }
    };

    return (
        <WebSocketContext.Provider value={{ sendMessage, messages, socket }}>
            {children}
        </WebSocketContext.Provider>
    );
};

