import React, { useContext, useEffect, useRef } from 'react'
import { zGameContext } from './zGameContext'
import { WebSocketContext } from './WebSocketContext'
import { messageHandlers } from '../../helpers/messageHandlers'
import { playerRoomTransitionSetter } from '../../setters/settersPlayer'

export const WebSocketProvider = ({ children }) => {
	const wsRef = useRef(null)

	const { setGameData, messages, setMessages, addLog, gameData } = useContext(zGameContext)
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
			const handler = messageHandlers[data.action]
			if (handler) {
				handler(data, setGameData)
			}
			console.log(handler)
			if (data.type === 'playerAction') {
				if (data.action === 'playerRoomTransition') playerRoomTransitionSetter(data, setGameData)
			}
			if (data.type === 'playerModify') {
				if (data.action === 'playerGainsExperience') {
					console.log('EXP GAIN')
				}
			}
			if (data.type === 'user') console.log(data.user, ' RECEIVED')
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
