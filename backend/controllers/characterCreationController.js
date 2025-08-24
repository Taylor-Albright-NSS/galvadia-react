import { PlayerRace } from '../models/playerRace.js'
import { PlayerClass } from '../models/playerClass.js'

//CHARACTER CLASS
export const getCharacterClassById = async (req, res) => {
	try {
		let { id } = req.params
		const characterClass = await PlayerClass.findOne({ where: { id } })
		console.log(characterClass, ' character class')
		if (!characterClass) return res.status(404).json({ message: `Character class not found` })
		return res.status(200).json(characterClass)
	} catch (err) {
		return res.status(500).json({ error: 'Failed to retrieve class by id.', err })
	}
}
export const getAllCharacterClasses = async (req, res) => {
	try {
		const characterClasses = await PlayerClass.findAll()
		console.log(characterClasses, ' character class')
		if (!characterClasses) return res.status(404).json({ message: `Character class not found` })
		return res.status(200).json(characterClasses)
	} catch (err) {
		return res.status(500).json({ error: 'Failed to retrieve classes.', err })
	}
}

//CHARACTER RACE
export const getCharacterRaceById = async (req, res) => {
	try {
		let { id } = req.params
		const characterRace = await PlayerRace.findOne({ where: { id } })
		if (!characterRace) return res.status(404).json({ message: `Character race not found` })
		return res.status(200).json(characterRace)
	} catch (err) {
		return res.status(500).json({ error: 'Failed to retrieve race by id.', err })
	}
}
export const getAllCharacterRaces = async (req, res) => {
	try {
		const characterRaces = await PlayerRace.findAll()
		if (!characterRaces) return res.status(404).json({ message: `Character races not found` })
		return res.status(200).json(characterRaces)
	} catch (err) {
		return res.status(500).json({ error: 'Failed to retrieve races.', err })
	}
}
