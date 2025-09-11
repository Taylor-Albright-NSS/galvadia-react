export const InfoPanelCharacterRace = ({ characterRace }) => {
	const { name, strength, dexterity, agility, constitution, intelligence, wisdom, mysticism, skills, description } = characterRace || {}
	return (
		<div className="pClass">
			<div className="class-heading">
				<p>{name}</p>
			</div>
			<div className="class-information">
				<div className="class-description">
					<div>Desc: {description}</div>
				</div>
				<div className="class-details">
					<div className="class-attributes">
						<div>Str: {strength}</div>
						<div>Dex: {dexterity}</div>
						<div>Agi: {agility}</div>
						<div>Con: {constitution}</div>
						<div>Int: {intelligence}</div>
						<div>Wis: {wisdom}</div>
						<div>Mys: {mysticism}</div>
					</div>
					<div className="class-skills">{skills && skills.map(skill => <p key={skill.id}>{skill}</p>)}</div>
				</div>
			</div>
		</div>
	)
}
