import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../../fetches/auth/authManager'
import { useReducer } from 'react'
import '../../../styles/register.css'

export default function Register() {
	const [state, dispatch] = useReducer(
		(state, action) => ({
			...state,
			...action,
		}),
		{
			email: '',
			username: '',
			firstname: '',
			lastname: '',
			password: '',
			matchingPassword: '',
		}
	)
	const navigate = useNavigate()

	async function handleSubmit(e) {
		e.preventDefault()
		if (state.password !== state.matchingPassword) {
			alert('Passwords do not match!')
		}

		try {
			const data = await register(state.username, state.email, state.password)
			if (!data) {
				throw new Error(`Registration failed`)
			}
			navigate('/login')
		} catch (errors) {
			for (const error in errors) {
				errors[error].forEach(err => console.error(`Error: `, err))
			}
		}
	}

	return (
		<div className="registration-container">
			<form className="sign-up-form" onSubmit={handleSubmit}>
				<fieldset style={{ display: 'flex', flexDirection: 'column' }}>
					<legend style={{ textAlign: 'center' }}>Create Account</legend>
					<label></label>
					<input type="text" id="email" name="email" className="login-input" placeholder="Email" onChange={e => dispatch({ email: e.target.value })} />

					<label></label>
					<input type="text" id="username" name="username" className="login-input" placeholder="Username" onChange={e => dispatch({ username: e.target.value })} />

					<label></label>
					<input type="password" id="password" name="password" className="login-input" placeholder="Password" onChange={e => dispatch({ password: e.target.value })} />

					<label></label>
					<input type="password" id="matchingPassword" name="matchingPassword" className="login-input" placeholder="Matching password" onChange={e => dispatch({ matchingPassword: e.target.value })} />
				</fieldset>
				<button className="sign-up-button">Sign Up</button>
				<Link to="../login" className="forgot-password-link">
					Already have an account?
				</Link>
			</form>
		</div>
	)
}
