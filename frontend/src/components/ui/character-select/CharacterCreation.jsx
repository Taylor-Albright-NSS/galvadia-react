import { CharacterCard } from './CharacterCard'
import './characterCreation.css'
import { useEffect, useState } from 'react'
import { getUserCharacters } from '../../../fetches/players/players'
import { Link, useNavigate } from 'react-router-dom'

export const CharacterCreation = () => {
	return (
		<div className="character-creation-container">
			<div className="character-creation-heading">Create Your aracter</div>
			<div className="character-creation-card-container">
				<div>Class 1</div>
				<div>Class 2</div>
				<div>Class 3</div>
				<div>Class 4</div>
				<div>Class 5</div>
				<div>Class 6</div>
				<div>Class 7</div>
				<div>Class 8</div>
				<div>Class 9</div>
				<div>Class 10</div>
				<div>Class 11</div>
				<div>Class 12</div>
				<div>Class 13</div>
			</div>
			<div className="character-creation-create">
				<Link to="/character-select">
					<button>Back</button>
				</Link>
			</div>
		</div>
	)
}
