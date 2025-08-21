const baseUrl = 'http://localhost:3000'

const retrieveToken = () => localStorage.getItem('token')

export const login = async (username, password) => {
	// const token = retrieveToken()
	try {
		const response = await fetch(`${baseUrl}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		})
		if (!response.ok) {
			throw new Error(`Login failed`)
		}
		const data = await response.json()
		return data
	} catch (err) {
		throw new Error(`Network or server error`)
	}
}
export const register = async (username, email, password) => {
	const response = await fetch(`${baseUrl}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, email, password }),
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
