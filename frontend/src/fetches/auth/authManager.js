const baseUrl = 'http://localhost:3000'

const retrieveToken = () => localStorage.getItem('token')

export const login = async (username, password) => {
	// const token = retrieveToken()
	const response = await fetch(`${baseUrl}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password }),
	})
	const data = await response.json()
	return data
}
export const register = async (username, password) => {
	const response = await fetch(`${baseUrl}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password }),
	})
	const data = await response.json()
	return data
}

export const logout = () => {
	return fetch(baseUrl + '/logout')
}

export const tryGetLoggedInUser = () => {
	return fetch(baseUrl + '/me').then(res => {
		return res.status === 401 ? Promise.resolve(null) : res.json()
	})
}
