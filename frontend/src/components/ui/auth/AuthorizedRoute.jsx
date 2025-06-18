import { Navigate } from 'react-router-dom'

const getToken = () => localStorage.getItem('token')
const getUser = () => localStorage.getItem('user')
export const AuthorizedRoute = ({ children }) => {
	let authed = false
	const token = getToken()
	console.log(token, ' token')
	token ? (authed = true) : (authed = false)

	return authed ? children : <Navigate to="/login" />
}
