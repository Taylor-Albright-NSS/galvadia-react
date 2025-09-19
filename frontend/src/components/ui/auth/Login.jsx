import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../../fetches/auth/authManager'
import { Button, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { zGameContext } from '../zGameContext'
import './login.css'
import { WebSocketContext } from '../WebSocketContext'

export default function Login() {
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [failedLogin, setFailedLogin] = useState(false)

	const handleSubmit = e => {
		e.preventDefault()
		login(username, password).then(data => {
			try {
				const { token, user } = data
				localStorage.setItem('token', token)
				localStorage.setItem('user', JSON.stringify(user))
				navigate('/character-select')
			} catch (err) {
				console.error(`Error: `, err)
			}
		})
	}

	return (
		<div className="login-container">
			<div className="login-form">
				<h3>Login</h3>
				<FormGroup>
					<Label>Username</Label>
					<Input
						invalid={failedLogin}
						type="text"
						value={username}
						onChange={e => {
							setFailedLogin(false)
							setUsername(e.target.value)
						}}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Password</Label>
					<Input
						invalid={failedLogin}
						type="password"
						value={password}
						onChange={e => {
							setFailedLogin(false)
							setPassword(e.target.value)
						}}
					/>
					<FormFeedback>Login failed.</FormFeedback>
				</FormGroup>

				<Button color="primary" onClick={handleSubmit}>
					Login
				</Button>
				<p>
					Not signed up? Register <Link to="/register">here</Link>
				</p>
			</div>
		</div>
	)
}
