import { useState } from 'react'
import '../../../styles/character-select.css'

export const CharacterCard = () => {
	const [character, setCharacter] = useState({
		name: 'Zalbane',
		playerClass: 'Warrior',
		level: 23,
	})
	return (
		<div className="character-card">
			<img src="" alt="noimg" width="50px" />
			<div>{character.name}</div>
			<div>{character.playerClass}</div>
			<div>{character.level}</div>
		</div>
	)
}
