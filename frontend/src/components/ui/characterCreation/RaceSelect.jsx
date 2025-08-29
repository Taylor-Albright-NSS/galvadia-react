import { useEffect, useState } from 'react'
import { allRaces } from './characterRaces/characterRaces'
import './raceSelect.css'

export const RaceSelect = ({ setCharacterRace }) => {
	const [allRaces, setAllRaces] = useState(null)
	function handleSelection(selectedRace) {
		setCharacterRace(selectedRace)
	}
	useEffect(() => {
		async function retrieveRaces() {
			try {
				const response = await fetch(`http://localhost:3000/character-races`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				const data = await response.json()
				console.log(data, ' RACE DATA')
				if (!data) throw Error(`Error retrieving character races`)
				setAllRaces(data)
			} catch (error) {
				console.log(`Error: `, error)
			}
		}
		retrieveRaces()
	}, [])

	return (
		<div className="race-main">
			<div className="race-heading">Choose a Race</div>
			<div className="race-select">
				{allRaces &&
					allRaces.map(race => {
						console.log(race, ' race')
						return (
							<div key={race.id} className="race-icon" onClick={() => handleSelection(race)}>
								{race.name}
							</div>
						)
					})}
			</div>
		</div>
	)
}
