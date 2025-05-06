import '../styles/colors.css'

export const areaDisplay = (area, enemies, npcs, items, players) => {
	console.log(npcs, ' area npcs')
	const splitDescription = area.description ? area.description.split(' ') : ''
	return (
		<div className="my-2">
			<p className={area.headingColor}>{area.heading}</p>
			<p>
				{splitDescription &&
					splitDescription.map((word, index) => {
						if (area.Keywords?.some(keyword => keyword.refName == word)) {
							return (
								<span key={index} style={{ color: 'red' }}>
									{word + ' '}
								</span>
							)
						}
						return word + ' '
					})}
			</p>
			<span className="d-flex">
				{area.exitsBool && <p>Exits: </p>}
				{area.exitsBool &&
					Object.entries(area.exitsBool).map(([first, second], index) => {
						let firstLetter = first.slice(0, 1)
						firstLetter = firstLetter.toUpperCase()
						let newWord = firstLetter + first.slice(1, first.length)
						let lockedColor = 'yellow'
						let blockedColor = 'red'
						return (
							<p className={`mx-1 ${second == 'locked' ? lockedColor : second == 'blocked' ? blockedColor : 'green'}`} key={index}>
								{newWord}
							</p>
						)
					})}
			</span>
			{items?.length > 0 && (
				<span className="d-flex flex-wrap">
					<p>Items: </p>
					{items.map((item, index) => {
						return (
							<p style={{ whiteSpace: 'noWrap' }} className="mx-1 green" key={index}>
								{item.name}
							</p>
						)
					})}
				</span>
			)}
			{npcs?.length > 0 && (
				<span className="d-flex flex-wrap">
					<p>People: </p>
					{npcs.map((npc, index) => {
						return (
							<p className="mx-1 green" key={index}>
								{npc.Npc.name}
							</p>
						)
					})}
				</span>
			)}
			{players?.length > 0 && (
				<span className="d-flex flex-wrap">
					<p>Players: </p>
					{players.map((player, index) => {
						return (
							<p className="mx-1 green" key={index}>
								{player.name}
							</p>
						)
					})}
				</span>
			)}
			{enemies?.length > 0 && (
				<span className="d-flex flex-wrap">
					<p>Enemies: </p>
					{enemies.map((enemy, index) => {
						return (
							<p className="mx-1 green" key={index}>
								{enemy.name}
							</p>
						)
					})}
				</span>
			)}
		</div>
	)
}
