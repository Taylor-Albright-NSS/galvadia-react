import React, { useContext, useEffect, useRef } from 'react'
import { zGameContext } from './zGameContext'
import { WebSocketContext } from './WebSocketContext'
import { playerAdvancesEnemySetter, playerLooksSetter, playerRetreatsSetter, playerRoomTransitionSetter, playerSpeaksToNpcSetter, playerUpdateAllAttributesSetter } from '../../setters/settersPlayer'
import { enemyDiesSetter, enemySpawnsSetter, enemyTakesDamageSetter } from '../../setters/settersEnemy'
import { areaCurrentAreaItemsSetter, itemToPlayerSetter } from '../../setters/settersArea'
import { playerEquipsArmorSetter, playerPacksItemSetter, playerPicksUpAllItemsSetter, playerPicksUpItemSetter, playerRemovesArmorSetter, playerUnpacksItemSetter } from '../../setters/settersItem'
import { keywordActivationSetter, keywordAlreadyActivated, keywordItemToPlayerSetter } from '../../setters/settersKeyword'
import { npcMovesSetter } from '../../setters/settersNpc'

export const WebSocketProvider = ({ children }) => {
	const wsRef = useRef(null)

	const { setGameData, messages, setMessages, addLog, gameData, playerStatus, setPlayerStatus } = useContext(zGameContext)
	const { player } = gameData

	useEffect(() => {
		const webSocket = new WebSocket('ws://localhost:3001')
		wsRef.current = webSocket
		const ws = wsRef.current
		console.log(ws)
		if (!ws) return
		if (ws.readyState === WebSocket.CONNECTING) {
			ws.onopen = () => {
				console.log('WebSocket is now open, readState: ', ws.readyState)
				addLog('WebSocket Connected!')
				ws.send(JSON.stringify({ type: 'join', playerId: 1, areaId: 1, name: 'John Doe' }))
			}
		} else if (ws.readyState === WebSocket.OPEN) {
			console.log('WebSocket is already open')
			addLog('WebSocket is already open')
			ws.send(JSON.stringify({ type: 'join', playerId: player.id, areaId: player.area_id, name: player.name }))
		}
		ws.onmessage = event => {
			const data = JSON.parse(event.data)
			// Will need to make a new module to house the messageHandlers
			// const handler = messageHandlers[data.action]
			// if (handler) {
			// 	handler(data, setGameData)
			// }
			console.log(data, " DATA")
			if (data.type === 'playerAction') {
				if (data.action === 'playerRoomTransition') {
					console.log(addLog, " FIRST ADD LOG")
					playerRoomTransitionSetter(data, setGameData, addLog)
				}
				if (data.action === 'playerAdvancesEnemy') {playerAdvancesEnemySetter(data, setGameData)}
				if (data.action === 'playerRetreats') {playerRetreatsSetter(data, setGameData)}
				if (data.action === 'playerLooks') {playerLooksSetter(data, setGameData, addLog)}
				if (data.action === 'playerSpeaksToNpc') {playerSpeaksToNpcSetter(data, addLog)}
				if (data.action === 'playerEquipsArmor') {playerEquipsArmorSetter(data, setGameData, addLog)}
				if (data.action === 'playerRemovesArmor') {playerRemovesArmorSetter(data, setGameData, addLog)}
				if (data.action === 'playerUnpacksItem') {playerUnpacksItemSetter(data, setGameData, addLog)}
				if (data.action === 'playerPacksItem') {playerPacksItemSetter(data, setGameData, addLog)}
				if (data.action === 'playerPicksUpItem') {playerPicksUpItemSetter(data, setGameData, addLog)}
				if (data.action === 'playerPicksUpAllItems') {playerPicksUpAllItemsSetter(data, setGameData, addLog)}
				if (data.action === 'playerAttackHitsEnemy') {enemyTakesDamageSetter(data, setGameData, addLog)}
			}
			if (data.type === 'npcEvent') {
				if (data.action === 'npcMoves') {
					npcMovesSetter(data, setGameData, addLog)
				}
			}
			if (data.type === 'keyword') {
				console.log(data.action, " DATA ACTION")
				if (data.action === 'activateSuccess') keywordActivationSetter(data, addLog)
				if (data.action === 'activateFail') keywordAlreadyActivated(data, addLog)
				if (data.action === 'itemToPlayer') keywordItemToPlayerSetter(data, setGameData, addLog)
			}
			if (data.type === 'error') {
				console.log(data)
			}
			if (data.type === 'itemAction') {
				if (data.action === 'currentAreaItems') {areaCurrentAreaItemsSetter(data, setGameData, addLog)}
				if (data.action === 'itemToPlayer') {itemToPlayerSetter(data, setGameData, addLog)}
			}
			if (data.type === 'playerModify') {
				if (data.action === 'playerGainsExperience') {
					console.log('EXP GAIN')
				}
				if (data.action === 'updateAllAttributes') playerUpdateAllAttributesSetter(data, setGameData, addLog)
			}
			if (data.type === 'enemyAction') {
				if (data.action === 'enemyTakesDamage') {enemyTakesDamageSetter(data, setGameData, addLog)}
				if (data.action === 'enemyDies') {enemyDiesSetter(data, setGameData, addLog)}
				if (data.action === 'enemySpawns') {enemySpawnsSetter(data, setGameData, addLog)}
			}
			if (data.type === 'gamemessage') console.log(data, ' RECEIVED')
			if (data.type === 'playerDialogue') {
				addLog(data.dialogue)
			}
			if (data.type === 'playerMoves') {
				addLog(data.message)
			}
			setMessages(prev => [...prev, event.data])
		}

		ws.onerror = error => {
			addLog(`Websocket error: ${error}`)
		}

		ws.onclose = () => {
			console.log('WebSocket closed')
			addLog(`Websocket closed`)
		}

		return () => {
			ws.close()
		}
	}, [])

	const sendMessage = message => {
		const ws = wsRef.current
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify(message))
		} else {
			console.error('WebSocket is not connected')
		}
	}

	return <WebSocketContext.Provider value={{ sendMessage, messages, ws: wsRef.current }}>{children}</WebSocketContext.Provider>
}
