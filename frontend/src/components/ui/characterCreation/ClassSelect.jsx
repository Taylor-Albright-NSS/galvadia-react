import { allClasses } from './characterClasses/characterClasses'
import './classSelect.css'

export const ClassSelect = ({ setCharacterClass }) => {
	function handleSelection(selectedClass) {
		console.log(selectedClass)
		setCharacterClass(selectedClass)
	}
	const { berserker, fighter } = allClasses

	return (
		<div className="class-main">
			<div className="choose-class-heading">Choose a Class</div>
			<div className="class-select">
				<div id="berserker" className="class-icon" onClick={() => handleSelection(berserker)}>
					Berserker
				</div>
				<div id="fighter" className="class-icon" onClick={() => handleSelection(fighter)}>
					Fighter
				</div>
				<div id="knight" className="class-icon" onClick={() => handleSelection()}>
					class 3
				</div>
				<div id="assassin" className="class-icon" onClick={() => handleSelection()}>
					class 4
				</div>
				<div id="thief" className="class-icon" onClick={() => handleSelection()}>
					class 5
				</div>
				<div id="shadowblade" className="class-icon" onClick={() => handleSelection()}>
					class 6
				</div>
				<div id="martial-monk" className="class-icon" onClick={() => handleSelection()}>
					class 7
				</div>
				<div id="mystic-monk" className="class-icon" onClick={() => handleSelection()}>
					class 8
				</div>
				<div id="elemental-monk" className="class-icon" onClick={() => handleSelection()}>
					class 9
				</div>
				<div id="pyromancer" className="class-icon" onClick={() => handleSelection()}>
					class 10
				</div>
				<div id="cryo-mage" className="class-icon" onClick={() => handleSelection()}>
					class 11
				</div>
				<div id="lightning-magus" className="class-icon" onClick={() => handleSelection()}>
					class 12
				</div>
				<div id="ranger" className="class-icon" onClick={() => handleSelection()}>
					class 13
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
				<div className="class-icon" onClick={() => handleSelection()}>
					test
				</div>
			</div>
		</div>
	)
}
