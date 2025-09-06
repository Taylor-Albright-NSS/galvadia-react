import { keywordActivationService, keywordExamineService, readSignService } from '../controllerServices/keywordServices.js'

//prettier-ignore
export const handleKeywordActions = (data, ws, wss) => {
    if (data.action === 'examine') keywordExamineService(data, ws, wss)
    if (data.action === 'activation') keywordActivationService(data, ws, wss)
    if (data.action === 'read') readSignService(data, ws, wss)
}
