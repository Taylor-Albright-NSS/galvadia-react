export const InformationPanel = ({ characterClass }) => {
	return (
		<>
			<div>information panel</div>
			<div>Str: {characterClass?.str}</div>
			<div>Dex: {characterClass?.dex}</div>
			<div>Agi: {characterClass?.agi}</div>
			<div>Con: {characterClass?.con}</div>
			<div>Int: {characterClass?.int}</div>
			<div>Wis: {characterClass?.wis}</div>
			<div>Mys: {characterClass?.con}</div>
		</>
	)
}
