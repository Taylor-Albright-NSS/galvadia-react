export const toggleStatusTrue = (playerStatus, statusType) => !playerStatus[statusType] && (playerStatus[statusType] = true)
export const toggleStatusFalse = (playerStatus, statusType) => playerStatus[statusType] && (playerStatus[statusType] = false)
