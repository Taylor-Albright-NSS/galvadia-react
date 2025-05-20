import { useContext, useRef, useState } from "react"
import { zGameContext } from "./zGameContext"
import { enemyTakesDamage } from "../../fetches/enemies/enemies"

export const PlayerBar = () => {
    const ref = useRef()
    const { currentArea, setEnemies, enemies, addLog, gameData } = useContext(zGameContext)
    const { player } = gameData
    const [reset, setReset] = useState(0)


   async function attackEnemy() {
        const enemyToAttack = enemies[0]
        const damage = 9
        enemyTakesDamage(damage, enemyToAttack.id, setEnemies, addLog)
    }

    
    return (
        player.attributes ?
        <div style={{display: 'flex'}}>
            <div style={{border: "4px solid yellow"}}>
                <div>Player Bar</div>
                <div>Name: {player?.name}</div>
                <div>Coords: x: {player?.x}  y: {player?.y}</div>
                <div>Room Id: {player?.area_id}</div>
                {/* <Button onClick={attackEnemy}>Attack Enemy</Button>
                <Button onClick={() => {console.log(enemies)}}>Check all enemies</Button> */}
            </div>
            <div style={{border: "4px solid green"}}>
                <div>Attributes</div>
                <div>Strength: {player.attributes.strength}</div>
                <div>Dexterity: {player.attributes.dexterity}</div>
                <div>Agility: {player.attributes.agility}</div>
                <div>Constitution: {player.attributes.constitution}</div>
                <div>Intelligence: {player.attributes.intelligence}</div>
                <div>Wisdom: {player.attributes.widsom}</div>
                <div>Mysticism: {player.attributes.mysticism}</div>
            </div>
            <div style={{border: "4px solid yellow"}}>
                <div>Stats</div>
                <div>Health: {player.stats.currentHealth}/{player.stats.maxHealth}</div>
                <div>Mana: {player.stats.currentMana}/{player.stats.maxMana}</div>
                <div>Burden: {player.stats.burden}</div>
                <div>Weight: {player.stats.weight}</div>
            </div>
            <div style={{border: "4px solid red"}}>
                <div>Offenses</div>
                <div>Attack Power: {player.offenses.attackPower}</div>
                <div>Attack Speed: {player.offenses.attackSpeed}</div>
                <div>Accuracy: {player.offenses.accuracy}</div>
                <div>Magic Power: {player.offenses.magicPower}</div>
                <div>Mystic Power: {player.offenses.mysticPower}</div>
            </div>
            <div style={{border: "4px solid grey"}}>
                <div>Defenses</div>
                <div>Slashing Armor: {player.defenses.slashing}</div>
                <div>Piercing Armor: {player.defenses.piercing}</div>
                <div>Blunt Armor: {player.defenses.blunt}</div>
                <div>Dodge: {player.defenses.dodge}</div>

            </div>
        </div>
                : 'Loading'
    )
}