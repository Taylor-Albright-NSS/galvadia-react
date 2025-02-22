import { Button, Container, Input } from "reactstrap"
import { createEnemy, enemyDies } from "../../fetches/enemies/enemies"
import { useContext, useState } from "react"
import { fetchCurrentArea } from "../../managers/areas"
import { zGameContext } from "./zGameContext"
import { fetchCreateItem, fetchCurrentAreaItems } from "../../fetches/items/items"

export const DevWindow = () => {
    const { currentArea, enemies, player, setEnemies, setItems } = useContext(zGameContext)
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
    return (
        <Container>
            <Input style={{width: "80px"}} type="number" onChange={inputHandler}/>
            <Button onClick={killEnemy}>Kill Enemy</Button>
            <Button onClick={fetchCreateEnemy}>Create Enemy</Button>
            <Button onClick={retrieveCurrentArea}>Get Current Area</Button>
            <Button onClick={retrieveAllItems}>Get All Items</Button>
            <Button onClick={createItem}>Create New Item</Button>
            <Button onClick={checkInventory}>Check Player Inventory</Button>
        </Container>
    )
}