import { Button, Container, Input } from "reactstrap"
import { createEnemy, enemyDies } from "../../fetches/enemies/enemies"
import { useContext, useState } from "react"
import { fetchCurrentArea } from "../../managers/areas"
import { zGameContext } from "./zGameContext"
import { fetchCreateItem, fetchCurrentAreaItems } from "../../fetches/items/items"
import { pickupItem, joshTest } from "../../websocket"
import { socket } from "../../websocket"

export const DevWindow = () => {
    const { currentArea, enemies, player, setEnemies, setItems, addLog } = useContext(zGameContext)
    const [enemyId, setEnemyId] = useState(0)

    function inputHandler(e) {
        const input = e.target.value
        console.log(input)
        setEnemyId(input)
    }

    function killEnemy() {
        enemyDies(enemyId)
    }

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
        joshTest()
        socket.onmessage = (event) => {
            console.log('???')
            const data = JSON.parse(event.data);
            console.log(event.data)
            if (data.type === "joshCommand") {
                console.log("ALMOST THERE!")
                console.log(data.message)
                const p = document.createElement('p')
                console.log(p, " paragrasph")
                addLog(data.message)
            }
        }
        console.log("JOSH HAS BEEN TESTED")
    }
    return (
        <Container>
            <Input style={{width: "80px"}} type="number" onChange={inputHandler}/>
            <Button onClick={killEnemy}>Kill Enemy</Button>
            <Button onClick={fetchCreateEnemy}>Create Enemy</Button>
            <Button onClick={retrieveCurrentArea}>Get Current Area</Button>
            <Button onClick={retrieveAllItems}>Get All Items</Button>
            <Button onClick={createItem}>Create New Item</Button>
            <Button onClick={checkInventory}>Check Player Inventory</Button>
            <Button onClick={websocketPickupItem}>Websocket pickup item</Button>
            <Button onClick={websocketJoshTest}>Websocket Josh Test</Button>
        </Container>
    )
}