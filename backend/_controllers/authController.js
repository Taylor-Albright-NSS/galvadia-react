import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

import dotenv from 'dotenv'
dotenv.config()

const authRouter = express.Router()

// authRouter.post('/signup', async (req, res) => {
export const postRegister = async (req, res) => {
	const { username, email, password } = req.body
	const usernameExists = await User.findOne({ where: { username } })
	console.log(username, ' username')
	console.log(email, ' email')
	console.log(password, ' password')
	console.log(usernameExists, ' usernameExists')
	if (usernameExists) {
		return res.status(400).json({ message: 'Username already taken' })
	}

	const passwordHash = await bcrypt.hash(password, 10)
	const user = await User.create({
		username,
		email,
		passwordHash,
	})
	console.log(user, ' created user')
	res.json({ message: 'User registered!', userId: user.id })
}

// authRouter.post('/login', async (req, res) => {
export const postLogin = async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ where: { username } })

	if (!user) {
		return res.status(400).json({ message: 'User not found' })
	}
	console.log(password, ' password')
	console.log(user.passwordHash, ' passwordHash')
	console.log(user)
	// const match = await bcrypt.compare(password, user.passwordHash)

	// if (!match) {
	// 	return res.status(400).json({ message: 'Invalid credentials' })
	// }

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

	return res.status(200).json({ token, user: { id: user.id, name: user.name, username: user.username } })
}

export function authenticateJWT(req, res, next) {
	const auth = req.headers.authorization || ''
	const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
	if (!token) return res.status(401).json({ error: 'Missing token' })

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET)
		// Convention: put user id in `sub` or `id`
		req.user = { id: payload.sub || payload.id, roles: payload.roles || [] }
		next()
	} catch {
		return res.status(401).json({ error: 'Invalid token' })
	}
}
