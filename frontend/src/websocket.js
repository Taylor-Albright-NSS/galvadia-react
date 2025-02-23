const socket = new WebSocket("ws://localhost:3001");

socket.onopen = () => {
    console.log("Connected to WebSocket server");

    // Send a message when a player joins
    socket.send(JSON.stringify({ type: "join", playerId: "player1" }));
};

socket.onerror = (error) => {
    console.error(" Websocket error:", error)
}

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "playerJoined") {
        console.log(`Player ${data.playerId} joined the game.`);
    }

    if (data.type === "itemPickedUp") {
        console.log(`Player ${data.playerId} picked up item ${data.itemId}`);
        // Update UI to reflect item being removed
    }
    if (data.type === "joshClicked") {
        console.log("JOSHhhhh!")
    }
};

socket.onclose = () => {
    console.log(" Websocket disconnected")
}

function pickupItem(itemId) {
    socket.send(JSON.stringify({ type: "pickupItem", playerId: "player1", itemId }));
}
function joshTest() {
    socket.send(JSON.stringify({ type: "josh", id: 44}))
}

export {socket, pickupItem, joshTest}
