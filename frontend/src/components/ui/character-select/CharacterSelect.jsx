import { CharacterCard } from './CharacterCard'
import '../../../styles/character-select.css'

export const CharacterSelect = () => {
	return (
		<div className="character-select-container">
			<div className="character-select-heading">Select your character</div>

			<div className="character-select-card-container">
				<CharacterCard />
				<CharacterCard />
				<CharacterCard />
				<CharacterCard />
				<CharacterCard />
				<CharacterCard />
				<CharacterCard />
				<CharacterCard />
				<CharacterCard />
				<CharacterCard />
			</div>

			<div className="character-select-create">
				<button>Create New Character</button>
			</div>
		</div>
	)
}
