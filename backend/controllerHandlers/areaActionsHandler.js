import { areaAnticipatedService } from '../controllerServices/areaActionServices.js'

export const handleAreaAction = async (data, ws) => {
	console.log(data, ' DATA')
	if (data.action === 'anticipatedArea') {
		areaAnticipatedService(data, ws)
	}
}
