import { UI } from './components/ui/UI'
import { WebSocketProvider } from './components/ui/WebSocketProvider'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/ui/auth/Login'
import { AuthorizedRoute } from './components/ui/auth/AuthorizedRoute'
import Register from './components/ui/auth/Register'
import { CharacterSelectLayout } from './components/ui/characterSelect/CharacterSelectLayout'
import { Layout } from './components/layout/Layout'
import { CharacterSelect } from './components/ui/characterSelect/CharacterSelect'
import { CharacterCreation } from './components/ui/characterCreation/CharacterCreation'

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
								<CharacterSelectLayout>{<CharacterSelect />}</CharacterSelectLayout>
							</AuthorizedRoute>
						}
					/>
					<Route
						path="/character-creation"
						element={
							<AuthorizedRoute>
								<CharacterCreation />
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
