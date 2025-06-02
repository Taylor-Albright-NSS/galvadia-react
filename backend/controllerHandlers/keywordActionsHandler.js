import { keywordActivationService } from '../controllerServices/keywordServices.js'

//prettier-ignore
export const handleKeywordActions = (data, ws, wss) => {
    console.log(data.action, " data.action")
    if (data.action === 'activation') {keywordActivationService(data, ws, wss)}
}
