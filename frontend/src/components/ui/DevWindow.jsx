import { Button, Col, Container, Input, Row } from 'reactstrap'
import { createEnemy, enemyDies, enemyTakesDamage, fetchAllEnemies, fetchEnemiesInRoom } from '../../fetches/enemies/enemies'
import { useContext, useState } from 'react'
import { fetchCurrentArea } from '../../fetches/areas/areas'
import { zGameContext } from './zGameContext'
import { fetchAllItemsThatBelongToPlayer, fetchCreateCrossbow, fetchCreateDagger, fetchCreateOnehandedSword, fetchCreateTwohandedSword, fetchCurrentAreaItems, fetchDeleteAllItems, fetchEveryItem } from '../../fetches/items/items'
// import { pickupItem, joshTest } from "../../websocket"

import { getPlayer1, getPlayer2 } from '../../fetches/players/players'
import { fetchIncreasePlayerExperience } from '../../fetches/players/players'
import { fetchGameData } from '../../fetches/gameData/gameData'
import { WebSocketContext } from './WebSocketContext'
import { enemySpawnsSender } from '../../senders/sendersEnemy'

export const DevWindow = () => {
	const { gameData, setGameData, addLog, playerStatus } = useContext(zGameContext)
	const allContext = useContext(zGameContext)
	console.log(allContext, " allContext")
	const { ws } = useContext(WebSocketContext)
	const { currentArea, enemies, player, npcs, items, playerItems, players } = gameData
	const [enemyId, setEnemyId] = useState(0)
	const [logState, setLogState] = useState('')
	console.log(currentArea)

	function resetPlayer() {
		ws.send(JSON.stringify({ type: 'admin', action: 'resetPlayer', playerId: player.id }))
	}
	
	function enemySpawnsDev() {
		enemySpawnsSender(currentArea.id, ws)
	}

	function setPlayer1() {
		getPlayer1().then(player => {
			setGameData(prev => {
				console.log(prev)
				return {
					...prev,
					player: player,
					playerItems: player.items.sort(),
				}
			})
		})
	}
	function setPlayer2() {
		getPlayer2().then(player => {
			console.log(player)
			setGameData(prev => {
				console.log(prev)
				return {
					...prev,
					player: player,
					playerItems: player.items.sort(),
				}
			})
			setGameData(prev => ({ ...prev, playerItems: player.items.sort() }))
		})
	}

	function spawnTwohandedSword() {
		console.log(currentArea)
		fetchCreateTwohandedSword(currentArea.id).then(item => {
			setGameData(prev => ({ ...prev, items: [...prev.items, item] }))
			const test = (
				<div style={{ color: 'green' }}>
					<p>
						A <span className="green">{item.name}</span> has spawned
					</p>
				</div>
			)
			addLog(test)
		})
	}
	function spawnOnehandedSword() {
		fetchCreateOnehandedSword(currentArea.id).then(item => {
			setGameData(prev => ({ ...prev, items: [...prev.items, item] }))
			const test = (
				<div style={{ color: 'green' }}>
					<p>
						A <span className="green">{item.name}</span> has spawned
					</p>
				</div>
			)
			addLog(test)
		})
	}
	function spawnDagger() {
		fetchCreateDagger(currentArea.id).then(item => {
			setGameData(prev => ({ ...prev, items: [...prev.items, item] }))
			const test = (
				<div style={{ color: 'green' }}>
					<p>
						A <span className="green">{item.name}</span> has spawned
					</p>
				</div>
			)
			addLog(test)
		})
	}
	function spawnCrossbow() {
		fetchCreateCrossbow(currentArea.id).then(item => {
			setGameData(prev => ({ ...prev, items: [...prev.items, item] }))
			const test = (
				<div style={{ color: 'green' }}>
					<p>
						A <span className="green">{item.name}</span> has spawned
					</p>
				</div>
			)
			addLog(test)
		})
	}

	async function experienceGain() {
		const playerId = player.id
		const experienceGain = 100
		const playerPreviousLevel = player.level
		console.log(playerPreviousLevel, ' playerPreviousLevel')
		const updatedPlayer = await fetchIncreasePlayerExperience(playerId, experienceGain)
		if (updatedPlayer) {
			addLog(`${updatedPlayer.name} gained ${experienceGain} experience points!`)
			setGameData(prev => ({ ...prev, player: { ...prev.player, level: updatedPlayer.level, experience: updatedPlayer.experience } }))
			if (updatedPlayer.level > playerPreviousLevel) {
				addLog('YOU LEVELED UP!')
			}
		} else {
			addLog(`Player didn't gain any experience for some reason`)
		}
	}
	async function experienceLoss() {
		const playerId = player.id
		const experienceGain = -100
		const playerPreviousLevel = player.level
		const updatedPlayer = await fetchIncreasePlayerExperience(ws, playerId, experienceGain)
		if (updatedPlayer) {
			addLog(`${updatedPlayer.name} gained ${experienceGain} experience points!`)
			setGameData(prev => ({ ...prev, player: { ...prev.player, level: updatedPlayer.level, experience: updatedPlayer.experience } }))
			if (updatedPlayer.level < playerPreviousLevel) {
				addLog('YOU DELEVELED!')
			}
		} else {
			addLog(`Player didn't gain any experience for some reason`)
		}
	}
	async function deleteAllItems() {
		const data = await fetchDeleteAllItems()
		setGameData(prev => ({
			...prev,
			items: [],
			playerItems: []
		}))
		addLog(data.message)
	}

	return (
		<Container className="d-flex">
			<Row className="d-flex align-content-start">
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'orange', fontWeight: 'bold' }} className="m-1" onClick={enemySpawnsDev}>
					Spawn enemy
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'purple', fontWeight: 'bold' }} className="m-1" onClick={resetPlayer}>
					Reset Player
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'yellow', fontWeight: 'bold' }} className="m-1" onClick={setPlayer1}>
					Set Player 1
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'yellow', fontWeight: 'bold' }} className="m-1" onClick={setPlayer2}>
					Set Player 2
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'yellow', fontWeight: 'bold' }} className="m-1" onClick={experienceGain}>
					Gain 100 Exp
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'yellow', fontWeight: 'bold' }} className="m-1" onClick={experienceLoss}>
					Lose 100 Exp
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'green', fontWeight: 'bold' }} className="m-1" onClick={spawnTwohandedSword}>
					Spawn TH Sword
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'green', fontWeight: 'bold' }} className="m-1" onClick={spawnOnehandedSword}>
					Spawn OH Sword
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'green', fontWeight: 'bold' }} className="m-1" onClick={spawnDagger}>
					Spawn Dagger
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'green', fontWeight: 'bold' }} className="m-1" onClick={spawnCrossbow}>
					Spawn Bow
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'red', fontWeight: 'bold' }} className="m-1" onClick={deleteAllItems}>
					Delete all items
				</button>
			</Row>
		</Container>
	)
}
