import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'
import { GameProvider } from './components/ui/GameProvider'

createRoot(document.getElementById('root')).render(
	<GameProvider>
		<App />
	</GameProvider>
)
