import { useEffect, useMemo, useRef, useState } from "react";
import { getPlayer1, getPlayer2 } from "../../fetches/players/players";
import { zGameContext } from "./zGameContext";
import { fetchCurrentArea } from "../../fetches/areas/areas";
import { fetchEnemiesInRoom } from "../../fetches/enemies/enemies";
import { areaDisplay } from "../../DOMrenders/areaDisplay";
import { fetchCurrentAreaNpcs } from "../../fetches/npcs/npcs";
import { fetchAllItemsThatBelongToPlayer, fetchCurrentAreaItems } from "../../fetches/items/items";
import { fetchPlayersInRoom } from "../../fetches/players/players";

export const GameProvider = ({ children }) => {

  const [gameData, setGameData] = useState({
    player: {},
    currentArea: {},
    npcs: [],
    enemies: [],
    items: [],
    playerItems: [],
    players: [],
  })

  const playerStatus = useRef({
    isTalking: false,
    isInCombat: false,
    isSwinging: false,
    isAdvancing: false,
    isRetreating: false,
    isResting: false,
  })
  const [windowLogs, setWindowLogs] = useState([])

  const addLog = (message) => {
    console.log(message)
    setWindowLogs(prev => [...prev, message])
  }

  const contextValue = { gameData, setGameData, playerStatus, windowLogs, addLog }

  useEffect(() => {
    const updateAll = async () => {
      // if (!gameData.player.id) {return}
      try {
        console.log(gameData.player)
        let player
        if (gameData.player.id == 1) {player = await getPlayer1()}
        if (gameData.player.id == 2) {player = await getPlayer2()}
        // else {return}
        const areaId = player.area_id;
        const playerId = player.id;
  
        const [area, enemies, npcs, items, playerItems, players] = await Promise.all([
          fetchCurrentArea(areaId),
          fetchEnemiesInRoom(areaId),
          fetchCurrentAreaNpcs(areaId),
          fetchCurrentAreaItems(areaId),
          fetchAllItemsThatBelongToPlayer(playerId),
          fetchPlayersInRoom(areaId, playerId),
        ]);
  
        setGameData({
          player,
          currentArea: area,
          npcs,
          enemies,
          items,
          playerItems,
          players
        });
        console.log(players, " players")
        addLog(areaDisplay(area, enemies, npcs, items, players));
      } catch (error) {
        console.error("Error updating data:", error);
      }
    };
    updateAll();
  }, [gameData.player.area_id]);

  return (
    <zGameContext.Provider value={contextValue}>
      {children}
    </zGameContext.Provider>
  );
};
