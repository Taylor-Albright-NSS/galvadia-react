import { allRaces } from './characterRaces/characterRaces'
import './raceSelect.css'

export const RaceSelect = ({ setCharacterRace }) => {
	function handleSelection(selectedRace) {
		setCharacterRace(selectedRace)
	}
	const { human, elf } = allRaces

	return (
		<div className="class-main">
			<div className="choose-class-heading">Choose a Class</div>
			<div className="class-select">
				<div id="berserker" className="class-icon" onClick={() => handleSelection(human)}>
					Human
				</div>
				<div id="fighter" className="class-icon" onClick={() => handleSelection(elf)}>
					Elf
				</div>
				<div id="knight" className="class-icon" onClick={() => handleSelection()}>
					race 3
				</div>
				<div id="assassin" className="class-icon" onClick={() => handleSelection()}>
					race 4
				</div>
				<div id="thief" className="class-icon" onClick={() => handleSelection()}>
					race 5
				</div>
				<div id="shadowblade" className="class-icon" onClick={() => handleSelection()}>
					race 6
				</div>
				<div id="martial-monk" className="class-icon" onClick={() => handleSelection()}>
					race 7
				</div>
				<div id="mystic-monk" className="class-icon" onClick={() => handleSelection()}>
					race 8
				</div>
				<div id="elemental-monk" className="class-icon" onClick={() => handleSelection()}>
					race 9
				</div>
				<div id="pyromancer" className="class-icon" onClick={() => handleSelection()}>
					race 10
				</div>
				<div id="cryo-mage" className="class-icon" onClick={() => handleSelection()}>
					race 11
				</div>
				<div id="lightning-magus" className="class-icon" onClick={() => handleSelection()}>
					race 12
				</div>
				<div id="ranger" className="class-icon" onClick={() => handleSelection()}>
					race 13
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
