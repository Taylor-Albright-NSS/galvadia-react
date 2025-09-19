import { playerEquipsArmorJSX, playerPacksJSX, playerPicksUpAllItemsJSX, playerPicksUpItemJSX, playerRemovesArmorJSX, playerUnpacksJSX } from '../playerActions/jsxFunctions'

export const playerEquipsArmorSetter = (data, setGameData, addLog) => {
	const { item } = data
	console.log(data, ' player equips armor data')
	setGameData(prev => ({
		...prev,
		playerItems: prev.playerItems.map(playerItem => (playerItem.id === item.id ? item : playerItem)),
	}))
	const message = playerEquipsArmorJSX(item)
	addLog(message)
}
export const playerRemovesArmorSetter = (data, setGameData, addLog) => {
	const { item } = data
	console.log(data, ' player removes armor data')
	setGameData(prev => ({
		...prev,
		playerItems: prev.playerItems.map(playerItem => (playerItem.id === item.id ? item : playerItem)),
	}))
	const message = playerRemovesArmorJSX(item)
	addLog(message)
}

export const playerUnpacksItemSetter = (data, setGameData, addLog) => {
	const { item, player } = data
	console.log(player, ' player when unpacks')
	setGameData(prev => ({
		...prev,
		player,
		playerItems: prev.playerItems.map(playerItem => (playerItem.id === item.id ? item : playerItem)),
	}))
	const message = playerUnpacksJSX(item)
	addLog(message)
}

export const playerPacksItemSetter = (data, setGameData, addLog) => {
	const { item, player } = data
	setGameData(prev => ({
		...prev,
		player,
		playerItems: prev.playerItems.map(playerItem => (playerItem.id === item.id ? item : playerItem)),
	}))
	const message = playerPacksJSX(item)
	addLog(message)
}

export const playerPicksUpItemSetter = (data, setGameData, addLog) => {
	const { item } = data
	console.log(data, ' SETTER DATA')
	setGameData(prev => {
		return {
			...prev,
			items: [...prev.items.filter(i => i.id !== item.id)],
			playerItems: [...prev.playerItems, item],
		}
	})
	const message = playerPicksUpItemJSX(item)
	addLog(message)
}

export const playerPicksUpAllItemsSetter = (data, setGameData, addLog) => {
	const { items } = data
	console.log(data, ' SETTER DATA')
	setGameData(prev => {
		return {
			...prev,
			items: [...prev.items.filter(item => item.id !== items.id)],
			playerItems: [...items],
		}
	})
	const message = playerPicksUpAllItemsJSX()
	addLog(message)
}
