import { CharacterCard } from './CharacterCard'
import './characterSelect.css'
import { useContext, useEffect, useState } from 'react'
import { getUserCharacters } from '../../../fetches/players/players'
import { Link } from 'react-router-dom'
import { WebSocketContext } from '../WebSocketContext'

export const CharacterSelect = () => {
	const [characters, setCharacters] = useState([])
	const { setToken } = useContext(WebSocketContext)
	const token = localStorage.getItem('token')
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
				<Link to="/character-creation">
					<button>Create New Character</button>
				</Link>
				<button onClick={() => setToken(token)}>Join World</button>
			</div>
		</div>
	)
}
