import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../../fetches/auth/authManager'
import { Button, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { zGameContext } from '../zGameContext'

export default function Login() {
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [failedLogin, setFailedLogin] = useState(false)

	const handleSubmit = e => {
		e.preventDefault()
		login(username, password).then(data => {
			if (!data) {
				console.log('login failed')
			} else {
				const { token, user } = data
				localStorage.setItem('token', token)
				console.log(token, ' token')
				console.log(user, ' user')
				navigate('/character-select')
			}
		})
	}

	return (
		<div className="container" style={{ maxWidth: '500px' }}>
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
	)
}
