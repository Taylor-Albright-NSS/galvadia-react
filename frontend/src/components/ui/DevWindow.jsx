import { Button, Container, Input } from "reactstrap"
import { createEnemy, enemyDies, enemyTakesDamage } from "../../fetches/enemies/enemies"
import { useContext, useState } from "react"
import { fetchCurrentArea } from "../../managers/areas"
import { zGameContext } from "./zGameContext"
import { fetchCreateItem, fetchCurrentAreaItems } from "../../fetches/items/items"
import { pickupItem, joshTest } from "../../websocket"
import { socket } from "../../websocket"
import { getPlayer1, getPlayer2 } from "../../managers/testFetch"

export const DevWindow = () => {
    const { currentArea, enemies, player, setEnemies, setItems, addLog, setPlayer } = useContext(zGameContext)
    const [enemyId, setEnemyId] = useState(0)

    function fetchCreateEnemy() {
        createEnemy().then(enemy => {
            setEnemies(prev => ([...prev, enemy]))
        })
    }
    function retrieveCurrentArea() {
        console.log(currentArea)
    }

    function retrieveAllItems() {
        fetchCurrentAreaItems(currentArea.id).then(items => {
            console.log(items)
        })
    }

    function createItem() {
        fetchCreateItem().then(item => {
            console.log(item, " newly created item from button press")
            setItems(prev => [...prev, item])
        })
    }

    function checkInventory() {
        console.log(player.items)
    }

    async function websocketPickupItem() {
        pickupItem(1)
        console.log("websocket pick up item")
    }

    async function websocketJoshTest() {
        console.log(1)
        socket.send(JSON.stringify({ type: "josh", id: 44}))
        // socket.onmessage = (event) => {
        //     console.log(5)
        //     const data = JSON.parse(event.data);
        //     if (data.type === "joshCommand") {
        //         console.log(6)
        //         const p = document.createElement('p')
        //         addLog(data.message)
        //     }
        // }
    }

    function activatePlayer1() {
        getPlayer2().then(player1 => {
            setPlayer(player1)
        })
    }
    function activatePlayer2() {
        getPlayer2().then(player2 => {
            console.log(player2)
            setPlayer(player2)
        })
    }

       async function attackEnemy() {
            const enemyToAttack = enemies[0]
            const damage = 9
            console.log(enemyToAttack, " player bar enemy")
            enemyTakesDamage(damage, enemyToAttack.id, setEnemies, addLog)
        }

        function setPlayer1() {
            getPlayer1().then(setPlayer)
        }
        function setPlayer2() {
            getPlayer2().then(setPlayer)
        }
        function retrieveCurrentPlayer() {
            console.log(player)
        }
    return (
        <Container className="d-flex flex-wrap">
            <Button color="primary" className="m-1" onClick={fetchCreateEnemy}>Create Enemy</Button>
            <Button color="danger" className="m-1" onClick={attackEnemy}>Attack Enemy</Button>
            <Button color="primary" className="m-1" onClick={createItem}>Create Item</Button>
            <Button color="warning" className="m-1" onClick={() => {console.log(enemies)}}>Retrieve Enemies In Room</Button>
            <Button color="warning" className="m-1" onClick={retrieveAllItems}>Retrieve All Items</Button>
            <Button color="warning" className="m-1" onClick={checkInventory}>Retrieve Player Inventory</Button>
            <Button color="warning" className="m-1" onClick={retrieveCurrentArea}>Retrieve Current Area</Button>
            {/* <Button className="m-1" onClick={activatePlayer1}>Switch to Player1</Button> */}
            {/* <Button className="m-1" onClick={activatePlayer2}>Switch to Player2</Button> */}
            <Button className="m-1" onClick={websocketPickupItem}>Websocket pickup item</Button>
            <Button className="m-1" onClick={websocketJoshTest}>Websocket Josh Test</Button>
            <Button className="m-1" onClick={setPlayer1}>Set Player: Player 1</Button>
            <Button className="m-1" onClick={setPlayer2}>Set Player: Player 2</Button>
            <Button className="m-1" onClick={retrieveCurrentPlayer}>Retrieve Current Player</Button>
        </Container>
    )
}