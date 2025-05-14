import { playerRoomTransitionSetter } from "../setters/settersPlayer";

export const messageHandlers = {
    playerRoomTransition: (data, setGameData) => playerRoomTransitionSetter(data, setGameData),

}