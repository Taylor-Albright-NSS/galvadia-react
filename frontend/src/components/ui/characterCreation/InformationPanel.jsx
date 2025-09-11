import { InfoPanelCharacterClass } from './characterClasses/InfoPanelCharacterClass'
import { InfoPanelCharacterRace } from './characterRaces/InfoPanelCharacterRace'
import { InfoPanelCharacterStats } from './characterStats/InfoPanelCharacterStats'
import './informationPanel.css'

export const InformationPanel = ({ characterClass, characterRace }) => {
	return (
		<div className="information-panel">
			<InfoPanelCharacterClass characterClass={characterClass} />
			<InfoPanelCharacterRace characterRace={characterRace} />
			<InfoPanelCharacterStats characterClass={characterClass} characterRace={characterRace} />
		</div>
	)
}
