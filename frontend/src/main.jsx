import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'
import { GameProvider } from './components/ui/GameProvider'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
	<Router>
		<GameProvider>
			<App />
		</GameProvider>
	</Router>
)
