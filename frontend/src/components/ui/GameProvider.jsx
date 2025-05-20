import { useEffect, useState } from 'react'
import { zGameContext } from './zGameContext'
import { areaDisplay } from '../../DOMrenders/areaDisplay'

export const GameProvider = ({ children }) => {
	const [messages, setMessages] = useState([])
	const [windowLogs, setWindowLogs] = useState([])
	const [gameData, setGameData] = useState({
		player: {},
		currentArea: {},
		npcs: [],
		enemies: [],
		items: [],
		playerItems: [],
		players: [],
	})

	const [playerStatus, setPlayerStatus] = useState({
		isTalking: false,
		enemyCombatIds: [],
		isInCombat: function () {
			if (this.enemyCombatIds.length > 0) {
				return true
			}
			return false
		},
		isSwinging: false,
		isAdvancing: false,
		isRetreating: false,
		isResting: false,
	})

	const addLog = message => {
		setWindowLogs(prev => [...prev, message])
	}
	const contextValue = { messages, setMessages, gameData, setGameData, playerStatus, setPlayerStatus, windowLogs, addLog }

	useEffect(() => {
		const { currentArea, enemies, npcs, items, players } = gameData
		console.log('render check')
		addLog(areaDisplay(currentArea, enemies, npcs, items, players))
	}, [gameData.player.area_id])

	return <zGameContext.Provider value={contextValue}>{children}</zGameContext.Provider>
}
