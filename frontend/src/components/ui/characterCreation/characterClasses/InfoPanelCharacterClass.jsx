export const InfoPanelCharacterClass = ({ characterClass }) => {
	const { name, strength, dexterity, agility, constitution, intellegence, wisdom, mysticism, skills, abilities, description } = characterClass || {}
	console.log(characterClass, ' CHARACTER CLASS')
	return (
		<div className="pClass">
			{characterClass && (
				<>
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
								<div>Int: {intellegence}</div>
								<div>Wis: {wisdom}</div>
								<div>Mys: {mysticism}</div>
							</div>
							<div className="class-skills">{skills && skills.map(skill => <p key={skill.id}>{skill}</p>)}</div>
							<div className="class-abilities">{abilities && abilities.map(ability => <p key={ability.id}>{ability}</p>)}</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}
