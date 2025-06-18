import { keywordActivationService, keywordExamineService, readSignService } from '../controllerServices/keywordServices.js'

//prettier-ignore
export const handleKeywordActions = (data, ws, wss) => {
    console.log(data.action, " data.action")
    if (data.action === 'examine') keywordExamineService(data, ws, wss)
    if (data.action === 'activation') keywordActivationService(data, ws, wss)
    if (data.action === 'read') readSignService(data, ws, wss)
}
