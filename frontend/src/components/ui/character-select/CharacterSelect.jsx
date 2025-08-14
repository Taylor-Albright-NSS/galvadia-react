import { CharacterCard } from './CharacterCard'
import '../../../styles/character-select.css'
import { useEffect, useState } from 'react'
import { getUserCharacters } from '../../../fetches/players/players'

export const CharacterSelect = () => {
	const [characters, setCharacters] = useState([])

	useEffect(() => {
		// Get user's characters based on user.id
		const storedUser = localStorage.getItem('user')
		if (!storedUser) return // No user in localStorage

		try {
			const user = JSON.parse(storedUser)
			console.log(user, 'user')

			getUserCharacters(user.id).then(data => {
				console.log(data, 'characters')
				if (data) setCharacters(data)
			})
		} catch (err) {
			console.error('Error parsing stored user:', err)
		}
	}, [])

	return (
		<div className="character-select-container">
			<div className="character-select-heading">Select your character</div>
			<div className="character-select-card-container">{characters.length > 0 && characters.map(c => <CharacterCard key={c.id} c={c} />)}</div>
			<div className="character-select-create">
				<button>Create New Character</button>
			</div>
		</div>
	)
}
