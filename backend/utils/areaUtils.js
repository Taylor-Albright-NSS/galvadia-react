export const applyPlayerArea = (playerArea, mainArea) => {
	const baseArea = mainArea.toJSON()
	const newArea = {
		...baseArea,
		exitsBool: {
			...baseArea.exitsBool,
			...playerArea.unlockedDirections,
			...playerArea.unblockedDirections,
		},
	}
	return newArea
}
