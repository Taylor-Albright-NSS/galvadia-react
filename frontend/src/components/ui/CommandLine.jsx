/* eslint-disable react/prop-types */
import { Input } from 'reactstrap'
import { handleEnterPress } from '../../utils/handleEnterPress'
import { useContext } from 'react'
import { zGameContext } from './zGameContext'
import { WebSocketContext } from './WebSocketContext'

export const CommandLine = () => {
	const { ws } = useContext(WebSocketContext)
	const { sendMessage } = useContext(zGameContext)
	// const socket = ws
	const commandObject = useContext(zGameContext)
	const { gameData } = commandObject
	console.log(gameData)
	commandObject.ws = ws
	commandObject.sendMessage = sendMessage
	return (
		<Input
			type="text"
			style={{ border: '4px solid green', height: '30px', padding: 0 }}
			onKeyDown={e => {
				handleEnterPress(e, commandObject)
			}}
		/>
	)
}
