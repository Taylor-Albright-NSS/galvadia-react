import './infoPanelCharacterStats.css'

export const InfoPanelCharacterStats = ({ characterClass, characterRace }) => {
	console.log(characterClass)
	console.log(characterRace)
	//combine skills arrays
	//aggregate attributes
	const skills = aggregateSkills()
	const attributes = aggregateAttributes()
	function aggregateSkills() {
		if (characterClass && characterRace) {
			console.log(characterClass)
			console.log(characterRace)
			return Array.from(new Set([...characterClass.skills, ...characterRace.skills]))
		}
		return null
	}
	function aggregateAttributes() {
		if (characterClass && characterRace) {
			const attributes = { ...characterClass.attributes }
			for (const att in characterRace.attributes) {
				if (attributes[att]) {
					attributes[att] = characterRace.attributes[att] + (attributes[att] || 0)
				} else {
					attributes[att] = characterRace.attributes[att]
				}
			}
			return attributes
		}
	}
	console.log(attributes)
	return (
		<div className="stats">
			<div className="stats-heading">Heading</div>
			<div className="stats-details">
				<div className="stats-resources">
					<div>health</div>
					<div>mana</div>
					<div>class resources</div>
				</div>
				<div className="stats-attributes">
					<h5>Attributes</h5>
					{attributes && (
						<>
							<p>Str: {attributes.str}</p>
							<p>Dex: {attributes.dex}</p>
							<p>Agi: {attributes.agi}</p>
							<p>Con: {attributes.con}</p>
							<p>Int: {attributes.int}</p>
							<p>Wis: {attributes.wis}</p>
							<p>Mys: {attributes.mys}</p>
						</>
					)}
				</div>
				<div className="stats-skills">
					<h5>Skills</h5>
					{console.log(skills, ' SKILLS AT 58')}
					{skills &&
						skills.map((skill, index) => {
							return <p key={index}>{skill}</p>
						})}
				</div>
			</div>
		</div>
	)
}
