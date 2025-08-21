import { useState } from 'react'
import './characterSelect.css'
import { useEffect } from 'react'
import { getUserCharacters } from '../../../fetches/players/players'

export const CharacterCard = ({ c }) => {
	// const [characters, setCharacters] = useState([])

	// useEffect(() => {
	// 	// Get user's characters based on user.id
	// 	const storedUser = localStorage.getItem('user')
	// 	if (!storedUser) return // No user in localStorage

	// 	try {
	// 		const user = JSON.parse(storedUser)
	// 		console.log(user, 'user')

	// 		getUserCharacters(user.id).then(data => {
	// 			console.log(data, 'characters')
	// 			if (data) setCharacters(data)
	// 		})
	// 	} catch (err) {
	// 		console.error('Error parsing stored user:', err)
	// 	}
	// }, [])
	return (
		<div className="character-card">
			<div>
				<img src="x" alt="noimg" width="50px" />
				<div>{c.name}</div>
				<div>{c.playerClass}</div>
				<div>{c.level}</div>
			</div>
		</div>
	)
}
