import { Banner } from './Banner'
import { CharacterSelect } from './CharacterSelect'
import './characterSelect.css'

export const CharacterSelectLayout = ({ children }) => {
	return (
		<div className="character-select-layout">
			<Banner />
			{children}
		</div>
	)
}
