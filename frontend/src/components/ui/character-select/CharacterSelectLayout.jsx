import { Banner } from './Banner'
import { CharacterSelect } from './CharacterSelect'
import '../../../styles/character-select.css'

export const CharacterSelectLayout = () => {
	return (
		<div className="character-select-layout">
			<Banner />
			<CharacterSelect />
		</div>
	)
}
