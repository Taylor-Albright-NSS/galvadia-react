import { InfoPanelCharacterClass } from './characterClasses/InfoPanelCharacterClass'
import { InfoPanelCharacterRace } from './characterRaces/InfoPanelCharacterRace'
import './informationPanel.css'

export const InformationPanel = ({ characterClass, characterRace }) => {
	console.log(characterClass)
	console.log(characterRace)
	return (
		<div className="information-panel">
			{characterClass && <InfoPanelCharacterClass characterClass={characterClass} />}
			{characterRace && <InfoPanelCharacterRace characterRace={characterRace} />}
			{/* <div className="pClass">
				<div className="class-heading">
					<p>{name}</p>
				</div>
				<div className="class-information">
					<div className="class-description">
						<div>Desc: {description}</div>
					</div>
					<div className="class-details">
						<div className="class-attributes">
							<div>Str: {str}</div>
							<div>Dex: {dex}</div>
							<div>Agi: {agi}</div>
							<div>Con: {con}</div>
							<div>Int: {int}</div>
							<div>Wis: {wis}</div>
							<div>Mys: {mys}</div>
						</div>
						<div className="class-skills">
							<p>skills 1</p>
							<p>skills 2</p>
							<p>skills 3</p>
						</div>
						<div className="class-abilities">
							<p>abilities 1</p>
							<p>abilities 2</p>
							<p>abilities 3</p>
						</div>
					</div>
				</div>
			</div> */}
			{/* 
			<div className="race">
				<div className="race-heading">{name}</div>
				<div className="race-information">
					<div className="race-description">
						<div>Desc: {characterRace.name}</div>
					</div>
					<div className="race-details">
						<div className="race-attributes">
							<div>Str: {characterRace.attributes.str}</div>
							<div>Dex: {dex}</div>
							<div>Agi: {agi}</div>
							<div>Con: {con}</div>
							<div>Int: {int}</div>
							<div>Wis: {wis}</div>
							<div>Mys: {mys}</div>
						</div>
						<div className="race-skills">
							<p>skills 1</p>
							<p>skills 2</p>
							<p>skills 3</p>
						</div>
					</div>
				</div>
			</div> */}
			<div className="stats"></div>
		</div>
	)
}
