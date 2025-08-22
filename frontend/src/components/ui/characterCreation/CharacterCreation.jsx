import './characterCreation.css'
import { Link } from 'react-router-dom'
import { ClassSelect } from './ClassSelect'
import { RaceSelect } from './RaceSelect'
import { InformationPanel } from './InformationPanel'
import { useState } from 'react'

export const CharacterCreation = () => {
	const [characterClass, setCharacterClass] = useState()
	return (
		<div className="character-creation">
			<div className="panels-wrapper">
				<div className="selection-panel">
					<ClassSelect characterClass={characterClass} setCharacterClass={setCharacterClass} />
					<RaceSelect />
				</div>
				<div className="information-panel">
					<InformationPanel characterClass={characterClass} />
				</div>
			</div>

			<div className="footer">
				<Link to="/character-select">
					<button>Back</button>
				</Link>
			</div>
		</div>
	)
}
