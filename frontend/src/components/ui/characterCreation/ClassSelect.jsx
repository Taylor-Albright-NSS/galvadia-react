import { useEffect, useState } from 'react'
// import { allClasses } from './characterClasses/characterClasses'
import './classSelect.css'

export const ClassSelect = ({ setCharacterClass }) => {
	const [allClasses, setAllClasses] = useState(null)
	function handleSelection(selectedClass) {
		console.log(selectedClass)
		setCharacterClass(selectedClass)
	}

	useEffect(() => {
		async function retrieveClasses() {
			try {
				const response = await fetch(`http://localhost:3000/character-classes`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				const data = await response.json()
				if (!data) throw Error(`Error retrieving character classes`)
				setAllClasses(data)
			} catch (error) {
				console.log(`Error: `, error)
			}
		}
		retrieveClasses()
	}, [])

	return (
		<div className="class-main">
			<div className="choose-class-heading">Choose a Class</div>
			<div className="class-select">
				{allClasses &&
					allClasses.map(charClass => {
						console.log(charClass, ' charclass')
						return (
							<div key={charClass.id} className="class-icon" onClick={() => handleSelection(charClass)}>
								{charClass.name}
							</div>
						)
					})}
			</div>
		</div>
	)
}
