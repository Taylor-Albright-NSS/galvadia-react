import Player from '../models/player.js'

export const retrieveCharMaxHealth = async (req, res) => {
	console.log('BAM')
	const { id } = req.params
	try {
		const player = await Player.findByPk(id)
		const maxHealth = await player.getMaxHealth()
		console.log(maxHealth, ' MAX HEALTH')
		res.status(200).json(maxHealth)
	} catch (err) {
		console.error(err)
		res.status(500).json(err)
	}
}
