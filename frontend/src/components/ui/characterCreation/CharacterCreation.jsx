import './characterCreation.css'
import { Link } from 'react-router-dom'
import { ClassSelect } from './ClassSelect'
import { RaceSelect } from './RaceSelect'
import { InformationPanel } from './InformationPanel'
import { useEffect, useState } from 'react'

export const CharacterCreation = () => {
	const [characterClass, setCharacterClass] = useState(null)
	const [characterRace, setCharacterRace] = useState(null)
	const [character, setCharacter] = useState({
		name: 'test',
		classId: 0,
		raceId: 0,
	})
	function handleNameChange(e) {
		setCharacter(prev => ({
			...prev,
			name: e.target.value,
		}))
		console.log(character)
	}
	async function handleCreateCharacter() {
		console.log(character)
		const token = localStorage.getItem('token')
		console.log(token)
		const response = await fetch(`http://localhost:3000/create-character/`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(character),
		})
		const data = await response.json()
		if (!response.ok) {
			console.log(data, ' not ok data')
			console.log(response, ' failed response')
		}
	}

	useEffect(() => {
		setCharacter(() => ({
			name: character.name || null,
			classId: characterClass?.id || 0,
			raceId: characterRace?.id || 0,
		}))
	}, [characterClass, characterRace])

	return (
		<div className="character-creation">
			<div className="panels-wrapper">
				<div className="selection-panel">
					<ClassSelect characterClass={characterClass} setCharacterClass={setCharacterClass} />
					<RaceSelect characterRace={characterRace} setCharacterRace={setCharacterRace} />
				</div>
				<div className="information-panel">
					<InformationPanel characterClass={characterClass} characterRace={characterRace} />
				</div>
			</div>

			<div className="footer">
				<Link to="/character-select">
					<button>Back</button>
				</Link>
				<button onClick={() => handleCreateCharacter()}>Submit</button>
				<input type="text" onChange={handleNameChange} />
			</div>
		</div>
	)
}
