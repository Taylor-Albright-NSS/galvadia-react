const socket = new WebSocket("ws://localhost:3001");

//   socket.onopen = () => {
//     console.log("Connected to WebSocket server");
//     socket.send(JSON.stringify({ type: "join"}));
//   };

socket.onerror = (error) => {
    console.error(" Websocket error:", error)
}

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("FRONTEND: on message hit")
    if (data.type === "playerJoined") {
        console.log(`Player joined: Player ${data.playerId} has joined the game.`);
    }
    
    if (data.type === "itemPickedUp") {
        console.log(`Item pickup: Player ${data.playerId} picked up item ${data.itemId}`);
        // Update UI to reflect item being removed
    }
    if (data.type === "joshCommand") {
        console.log(`Josh Command: Josh Command hit`)
        console.log(data.message)
    }
};

socket.onclose = () => {
    console.log(" Websocket disconnected")
}

function pickupItem(itemId) {
    socket.send(JSON.stringify({ type: "pickupItem", playerId: "player1", itemId }));
}
function joshTest() {
    console.log("Josh test invoked from websocket.js")
    socket.send(JSON.stringify({ type: "josh", id: 44}))
}

export {socket, pickupItem, joshTest}
