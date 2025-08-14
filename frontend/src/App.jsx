import { UI } from './components/ui/UI'
import { WebSocketProvider } from './components/ui/WebSocketProvider'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/ui/auth/Login'
import { AuthorizedRoute } from './components/ui/auth/AuthorizedRoute'
import Register from './components/ui/auth/Register'
import { CharacterSelectLayout } from './components/ui/character-select/CharacterSelectLayout'
import { Layout } from './components/layout/Layout'

export const App = () => {
	return (
		<WebSocketProvider>
			<Layout>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/character-select"
						element={
							<AuthorizedRoute>
								<CharacterSelectLayout />
							</AuthorizedRoute>
						}
					/>
					<Route
						path="/game"
						element={
							<AuthorizedRoute>
								<UI />
							</AuthorizedRoute>
						}
					/>
					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
			</Layout>
		</WebSocketProvider>
	)
}
