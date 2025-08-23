export const InfoPanelCharacterClass = ({ characterClass }) => {
	const { name, attributes, skills, abilities, description } = characterClass || {}
	const { str, dex, agi, con, int, wis, mys } = attributes
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
		</div>
	)
}
