import { useState } from 'react'
import './classSelect.css'

export const ClassSelect = ({ setCharacterClass }) => {
	const [currentClass, setCurrentClass] = useState({
		str: 0,
		dex: 0,
		agi: 0,
		con: 0,
		int: 0,
		wis: 0,
		mys: 0,
	})
	const berserker = { str: 10, dex: 1, agi: 2, con: 10, int: 0, wis: 0, mys: 0 }
	const fighter = { str: 9, dex: 1, agi: 2, con: 10, int: 0, wis: 0, mys: 0 }

	function handleSelection(selectedClass) {
		setCharacterClass(selectedClass)
	}

	return (
		<div className="class-main">
			<div className="class-heading">Choose a Class</div>
			<div className="class-select">
				<div id="berserker" className="class-icon" onClick={() => handleSelection(berserker)}>
					Berserker
				</div>
				<div id="fighter" className="class-icon" onClick={() => handleSelection(fighter)}>
					Fighter
				</div>
				<div id="knight" className="class-icon" onClick={() => handleSelection(fighter)}>
					class 3
				</div>
				<div id="assassin" className="class-icon" onClick={() => handleSelection(fighter)}>
					class 4
				</div>
				<div id="thief" className="class-icon" onClick={() => handleSelection(fighter)}>
					class 5
				</div>
				<div id="shadowblade" className="class-icon" onClick={() => handleSelection(fighter)}>
					class 6
				</div>
				<div id="martial-monk" className="class-icon" onClick={() => handleSelection(fighter)}>
					class 7
				</div>
				<div id="mystic-monk" className="class-icon" onClick={() => handleSelection(fighter)}>
					class 8
				</div>
				<div id="elemental-monk" className="class-icon" onClick={() => handleSelection(fighter)}>
					class 9
				</div>
				<div id="pyromancer" className="class-icon" onClick={() => handleSelection(fighter)}>
					class 10
				</div>
				<div id="cryo-mage" className="class-icon" onClick={() => handleSelection(fighter)}>
					class 11
				</div>
				<div id="lightning-magus" className="class-icon" onClick={() => handleSelection(fighter)}>
					class 12
				</div>
				<div id="ranger" className="class-icon" onClick={() => handleSelection(fighter)}>
					class 13
				</div>
			</div>
		</div>
	)
}
