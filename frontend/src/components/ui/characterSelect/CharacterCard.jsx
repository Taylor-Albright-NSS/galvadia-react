import { useContext, useState } from 'react'
import './characterSelect.css'
import { useEffect } from 'react'
import { getSelectedCharacter, getUserCharacters } from '../../../fetches/players/players'
import { zGameContext } from '../zGameContext'
import { useNavigate } from 'react-router-dom'
import { WebSocketContext } from '../WebSocketContext'

export const CharacterCard = ({ c }) => {
	// const [characters, setCharacters] = useState([])
	const { setGameData } = useContext(zGameContext)

	async function handleSelectCharacter() {
		const characterId = c.id
		const character = await getSelectedCharacter(characterId)
		console.log(character, ' SELECTED CHARACTER')
		if (!character) return console.log(`Character does not exist. Aborting connecting to world`)
		// ws.send(JSON.stringify({ type: 'join', playerId: character.id, areaId: character.area_id, name: character.name }))
		setGameData(prev => {
			return {
				...prev,
				player: character,
				playerItems: character?.items?.sort(),
			}
		})
		// navigate('/game')
		//Navigate to /game for game start
	}
	return (
		<div className="character-card" onClick={handleSelectCharacter}>
			<div>
				<img src="x" alt="noimg" width="50px" />
				<div>{c.name}</div>
				<div>{c.playerClass}</div>
				<div>{c.level}</div>
				<div>{c.id}</div>
			</div>
		</div>
	)
}
