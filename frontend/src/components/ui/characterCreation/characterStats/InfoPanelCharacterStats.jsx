import './infoPanelCharacterStats.css'

export const InfoPanelCharacterStats = ({ characterClass, characterRace }) => {
	//combine skills arrays
	//aggregate attributes
	const skills = aggregateSkills()
	const attributes = aggregateAttributes()

	function aggregateSkills() {
		if (characterClass && characterRace) {
			const totalSkills = []
			characterClass?.skills?.forEach(item => totalSkills.push(item))
			characterRace?.skills?.forEach(item => totalSkills.push(item))
			return totalSkills
		}
		return null
	}

	function aggregateAttributes() {
		if (characterClass && characterRace) {
			console.log(characterClass)
			let { strength, dexterity, agility, constitution, intelligence, wisdom, mysticism } = characterClass
			const attributes = {
				strength: strength + characterRace.strength,
				dexterity: dexterity + characterRace.dexterity,
				agility: agility + characterRace.agility,
				constitution: constitution + characterRace.constitution,
				intelligence: intelligence + characterRace.intelligence,
				wisdom: wisdom + characterRace.wisdom,
				mysticism: mysticism + characterRace.mysticism,
			}
			console.log(attributes)
			return attributes
		}
	}
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
							<p>Str: {attributes.strength}</p>
							<p>Dex: {attributes.dexterity}</p>
							<p>Agi: {attributes.agility}</p>
							<p>Con: {attributes.constitution}</p>
							<p>Int: {attributes.intelligence}</p>
							<p>Wis: {attributes.wisdom}</p>
							<p>Mys: {attributes.mysticism}</p>
						</>
					)}
				</div>
				<div className="stats-skills">
					<h5>Skills</h5>
					{skills &&
						skills.map((skill, index) => {
							return <p key={index}>{skill}</p>
						})}
				</div>
			</div>
		</div>
	)
}
