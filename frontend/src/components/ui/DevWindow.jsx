import { Button, Col, Container, Input, Row } from 'reactstrap'
import { createEnemy, enemyDies, enemyTakesDamage, fetchAllEnemies, fetchEnemiesInRoom } from '../../fetches/enemies/enemies'
import { useContext, useState } from 'react'
import { fetchCurrentArea } from '../../fetches/areas/areas'
import { zGameContext } from './zGameContext'
import { fetchAllItemsThatBelongToPlayer, fetchCreateCrossbow, fetchCreateDagger, fetchCreateItem, fetchCreateOnehandedSword, fetchCreateTwohandedSword, fetchCurrentAreaItems, fetchDeleteAllItems, fetchEveryItem, fetchPlayerUnpacksItem } from '../../fetches/items/items'
// import { pickupItem, joshTest } from "../../websocket"

import { getPlayer1, getPlayer2, playerGainsExperienceRequest } from '../../fetches/players/players'
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

	function enemySpawnsDev() {
		enemySpawnsSender(currentArea.id, ws)
	}

	function retrieveAllEnemies() {
		fetchAllEnemies().then(enemies => {
			console.log(enemies)
		})
	}
	function retrieveAreaEnemies() {
		fetchEnemiesInRoom(currentArea.id).then(area => {
			console.log(area)
		})
	}

	function fetchCreateEnemy() {
		createEnemy(currentArea.id).then(enemy => {
			setGameData(prev => ({
				...prev,
				enemies: [...prev.enemies, enemy],
			}))
			// setEnemies(prev => ([...prev, enemy]))
		})
	}
	function retrieveCurrentArea() {
		console.log(currentArea)
	}

	function retrieveAreaItems() {
		fetchCurrentAreaItems(currentArea.id).then(items => {
			console.log(items)
		})
	}
	function retrieveAllItems() {
		fetchEveryItem(currentArea.id).then(items => {
			console.log(items)
		})
	}

	async function attackEnemy() {
		console.log(enemies)
		console.log(enemies[0])
		const enemyToAttack = enemies[0]
		const damage = 9
		if (!enemyToAttack) {
			addLog('There is no enemy in the room to attack')
			return
		}
		addLog(`You swing at the enemy and hit it for ${damage} damage!`)
		enemyTakesDamage(damage, enemyToAttack.id, setGameData, addLog)
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
	function retrieveCurrentPlayer() {
		console.log(player)
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
		const updatedPlayer = await playerGainsExperienceRequest(ws, playerId, experienceGain)
		// const updatedPlayer = await fetchIncreasePlayerExperience(playerId, experienceGain)
		if (updatedPlayer) {
			addLog(`${updatedPlayer.name} gained ${experienceGain} experience points!`)
			setGameData(prev => ({ ...prev, player: { ...prev.player, level: updatedPlayer.level, experience: updatedPlayer.experience } }))
			// setPlayer(prev => ({...prev, level: updatedPlayer.level, experience: updatedPlayer.experience}))
			console.log(updatedPlayer.level, ' updatedPlayer.level')
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
		console.log(playerPreviousLevel, ' playerPreviousLevel')
		const updatedPlayer = await playerGainsExperienceRequest(ws, playerId, experienceGain)
		// const updatedPlayer = await fetchIncreasePlayerExperience(ws, playerId, experienceGain)
		if (updatedPlayer) {
			addLog(`${updatedPlayer.name} gained ${experienceGain} experience points!`)
			setGameData(prev => ({ ...prev, player: { ...prev.player, level: updatedPlayer.level, experience: updatedPlayer.experience } }))
			// setPlayer(prev => ({...prev, level: updatedPlayer.level, experience: updatedPlayer.experience}))
			console.log(updatedPlayer.level, ' updatedPlayer.level')
			if (updatedPlayer.level < playerPreviousLevel) {
				addLog('YOU DELEVELED!')
			}
		} else {
			addLog(`Player didn't gain any experience for some reason`)
		}
	}
	async function deleteAllItems() {
		const data = await fetchDeleteAllItems()
		addLog(data.message)
	}
	async function playerUnpacksItem() {
		const playerId = player.id
		const data = await fetchPlayerUnpacksItem(playerId)
	}

	function playerCheckGameStatus() {
		console.log(playerStatus)
		console.log(playerStatus.isInCombat())
	}

	async function testAllFetches() {
		const gameData = await Promise.all([fetchGameData(player.id, player.area_id)])
		console.log(gameData, ' game data frontend')
	}

	function websocketGetTest() {
		console.log(ws)
		ws.send(JSON.stringify({ type: 'fetch', action: 'get', request: ['player'] }))
	}
	function websocketGetReadyState() {
		console.log('ws ready state:', ws.readyState)
	}

	return (
		<Container className="d-flex">
			<Row className="d-flex align-content-start">
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'green', fontWeight: 'bold' }} className="m-1" onClick={enemySpawnsDev}>
					Spawn enemy
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'green', fontWeight: 'bold' }} className="m-1" onClick={websocketGetTest}>
					WEBSOCKET GET USER
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'green', fontWeight: 'bold' }} className="m-1" onClick={websocketGetReadyState}>
					WebSocket Get ReadyState
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'red', fontWeight: 'bold' }} className="m-1" onClick={fetchCreateEnemy}>
					Create Enemy
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'red', fontWeight: 'bold' }} className="m-1" onClick={attackEnemy}>
					Attack Enemy
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'red', fontWeight: 'bold' }} className="m-1" onClick={retrieveAllEnemies}>
					Get Enemies
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'red', fontWeight: 'bold' }} className="m-1" onClick={retrieveAreaEnemies}>
					Get Area Enemies
				</button>

				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'green', fontWeight: 'bold' }} className="m-1" onClick={retrieveCurrentArea}>
					Get Area
				</button>

				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'yellow', fontWeight: 'bold' }} className="m-1" onClick={retrieveCurrentPlayer}>
					Get Player
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'yellow', fontWeight: 'bold' }} className="m-1" onClick={playerCheckGameStatus}>
					Get Player Game Data
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

				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'blue', fontWeight: 'bold' }} className="m-1" onClick={retrieveAreaItems}>
					Get Area Items
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'blue', fontWeight: 'bold' }} className="m-1" onClick={retrieveAllItems}>
					Get All Items
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'blue', fontWeight: 'bold' }} className="m-1" onClick={spawnTwohandedSword}>
					Spawn TH Sword
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'blue', fontWeight: 'bold' }} className="m-1" onClick={spawnOnehandedSword}>
					Spawn OH Sword
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'blue', fontWeight: 'bold' }} className="m-1" onClick={spawnDagger}>
					Spawn Dagger
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'blue', fontWeight: 'bold' }} className="m-1" onClick={spawnCrossbow}>
					Spawn Bow
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'blue', fontWeight: 'bold' }} className="m-1" onClick={deleteAllItems}>
					Delete all items
				</button>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'blue', fontWeight: 'bold' }} className="m-1" onClick={testAllFetches}>
					Test all fetches
				</button>

				<input
					type="text"
					style={{ height: '50%', maxHeight: '40px', width: '100%', maxWidth: '90px', backgroundColor: 'blue', fontWeight: 'bold' }}
					className="m-1"
					onChange={e => {
						console.log(e.target.value)
						setLogState(e.target.value)
						console.log(logState)
					}}
				/>
				<button style={{ height: '100%', maxHeight: '80px', width: '100%', maxWidth: '90px', backgroundColor: 'blue', fontWeight: 'bold' }} className="m-1">
					Submit Log
				</button>
			</Row>
		</Container>
	)
}
