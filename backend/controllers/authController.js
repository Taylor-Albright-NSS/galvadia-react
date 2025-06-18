import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

import dotenv from 'dotenv'
dotenv.config()

const authRouter = express.Router()

// authRouter.post('/signup', async (req, res) => {
export const postRegister = async (req, res) => {
	const { username, password } = req.body
	const usernameExists = await User.findOne({ where: { username } })
	console.log(username, ' username')
	console.log(password, ' password')
	console.log(usernameExists, ' usernameExists')
	if (usernameExists) {
		return res.status(400).json({ message: 'Username already taken' })
	}

	const passwordHash = await bcrypt.hash(password, 10)
	const user = await User.create({
		username,
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
	const match = await bcrypt.compare(password, user.passwordHash)

	if (!match) {
		return res.status(400).json({ message: 'Invalid credentials' })
	}

	// Sign a JWT with userId
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

	res.json({ token, user })
}
